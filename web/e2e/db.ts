// DB access helper for E2E assertions (docs/06: integration asserts).
import { Pool } from "pg";

let pool: Pool | null = null;

export function db() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set — run e2e with web/.env.local sourced");
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export async function reportIdByToken(token: string): Promise<string> {
  const r = await db().query("select id from reports where token = $1", [token]);
  return r.rows[0].id;
}

export async function eventRows(reportId: string) {
  const r = await db().query("select type, created_at from events where report_id = $1 order by created_at asc", [reportId]);
  return r.rows.map((x) => x.type as string);
}

export async function leadCount(reportId: string): Promise<number> {
  const r = await db().query("select count(*)::int as n from leads where report_id = $1", [reportId]);
  return r.rows[0].n;
}

export async function closeDb() {
  if (pool) await pool.end();
  pool = null;
}
