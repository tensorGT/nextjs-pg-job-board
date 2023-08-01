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

