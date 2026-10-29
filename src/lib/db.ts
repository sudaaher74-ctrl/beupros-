import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __beuprosPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __beuprosSchema: Promise<void> | undefined;
}

function getPool(): Pool {
  if (!globalThis.__beuprosPool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    globalThis.__beuprosPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
      max: 10,
    });
  }
  return globalThis.__beuprosPool;
}

export const TABLES = ["users", "orders", "coupons", "products"] as const;
export type TableName = (typeof TABLES)[number];

export function schemaSql(): string {
  return TABLES.map(
    (t) => `CREATE TABLE IF NOT EXISTS ${t} (
      id TEXT PRIMARY KEY,
      position DOUBLE PRECISION NOT NULL,
      data JSONB NOT NULL
    );`
  ).join("\n");
}

async function ensureSchema() {
  if (!globalThis.__beuprosSchema) {
    globalThis.__beuprosSchema = getPool()
      .query(schemaSql())
      .then(() => undefined)
      .catch((e) => {
        globalThis.__beuprosSchema = undefined;
        throw e;
      });
  }
  return globalThis.__beuprosSchema;
}

/** Ordered document store: each row is a JSON document keyed by id. */
export function docs<T extends { id: string }>(table: TableName) {
  return {
    async all(): Promise<T[]> {
      await ensureSchema();
      const r = await getPool().query(`SELECT data FROM ${table} ORDER BY position ASC, id ASC`);
      return r.rows.map((x) => x.data as T);
    },
    async get(id: string): Promise<T | null> {
      await ensureSchema();
      const r = await getPool().query(`SELECT data FROM ${table} WHERE id = $1`, [id]);
      return r.rows[0] ? (r.rows[0].data as T) : null;
    },
    /** Insert or update. New rows go to the front when `front` is true, otherwise the end. */
    async put(doc: T, opts: { front?: boolean } = {}): Promise<void> {
      await ensureSchema();
      const pos = opts.front
        ? `(SELECT COALESCE(MIN(position), 0) - 1 FROM ${table})`
        : `(SELECT COALESCE(MAX(position), 0) + 1 FROM ${table})`;
      await getPool().query(
        `INSERT INTO ${table} (id, position, data) VALUES ($1, ${pos}, $2)
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
        [doc.id, JSON.stringify(doc)]
      );
    },
    async remove(id: string): Promise<boolean> {
      await ensureSchema();
      const r = await getPool().query(`DELETE FROM ${table} WHERE id = $1`, [id]);
      return (r.rowCount ?? 0) > 0;
    },
  };
}
