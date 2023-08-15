import Link from "next/link";
import { JobRow, pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string };
}) {
  const q = searchParams.q?.trim() || "";
  const tag = searchParams.tag?.trim() || "";

  const conds: string[] = [];
  const vals: string[] = [];
  if (q) {
    vals.push(`%${q}%`);
    conds.push(`(title ILIKE $${vals.length} OR company ILIKE $${vals.length})`);
  }
  if (tag) {
    vals.push(tag);
    conds.push(`$${vals.length} = ANY(tags)`);
  }

  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
  let jobs: JobRow[] = [];
  try {
    const res = await pool.query<JobRow>(`SELECT * FROM jobs ${where} ORDER BY created_at DESC`, vals);
    jobs = res.rows;
  } catch {
    jobs = [];
  }

  return (
    <main style={{ maxWidth: 820, margin: "32px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Dev Job Board</h1>
      <p>learning nextjs app router + postgres queries</p>

      <form method="GET" style={{ display: "flex", gap: 8, margin: "16px 0" }}>
