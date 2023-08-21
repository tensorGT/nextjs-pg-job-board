import { Pool } from "pg";

export interface JobRow {
  id: number;
  title: string;
  company: string;
  location: string;
  tags: string[];
  description: string;
  created_at: string;
}

// reuse pool so dev reload dont open too many connection
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/jobs_db",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}
