import bcrypt from "bcryptjs";

export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);

const isHash = (s: string) => /^\$2[aby]\$/.test(s);

/** Verifies against a bcrypt hash. Legacy plaintext values are still accepted so they can be upgraded on login. */
export async function verifyPassword(plain: string, stored: string) {
  if (isHash(stored)) return bcrypt.compare(plain, stored);
  return plain === stored;
}

export const needsRehash = (stored: string) => !isHash(stored);
