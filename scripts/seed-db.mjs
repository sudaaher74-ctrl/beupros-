// Usage: DATABASE_URL=postgres://... node scripts/seed-db.mjs
// Creates tables and imports src/data/*.json (idempotent: existing ids are kept).
import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}
const pool = new pg.Pool({
  connectionString: url,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

const dataDir = path.join(process.cwd(), "src/data");
const read = (f) => {
  const p = path.join(dataDir, f);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : [];
};

const isHash = (s) => /^\$2[aby]\$/.test(s);

for (const t of ["users", "orders", "coupons", "products"]) {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS ${t} (id TEXT PRIMARY KEY, position DOUBLE PRECISION NOT NULL, data JSONB NOT NULL)`
  );
}

const sets = {
  users: read("users.json"),
  orders: read("orders.json"),
  coupons: read("coupons.json"),
  products: read("products.json"),
};

for (const u of sets.users) {
  if (u.role === "admin" && process.env.ADMIN_INITIAL_PASSWORD) u.password = process.env.ADMIN_INITIAL_PASSWORD;
  if (u.password && !isHash(u.password)) u.password = await bcrypt.hash(u.password, 10);
}

for (const [table, rows] of Object.entries(sets)) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    let inserted = 0;
    for (let i = 0; i < rows.length; i++) {
      const r = await client.query(
        `INSERT INTO ${table} (id, position, data) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING`,
        [String(rows[i].id), i, JSON.stringify(rows[i])]
      );
      inserted += r.rowCount ?? 0;
    }
    await client.query("COMMIT");
    console.log(`${table}: ${inserted} inserted (${rows.length} in file)`);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
await pool.end();
