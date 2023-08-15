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
