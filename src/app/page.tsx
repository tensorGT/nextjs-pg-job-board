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
        <input name="q" defaultValue={q} placeholder="search role or company..." />
        <input name="tag" defaultValue={tag} placeholder="tag (eg: typescript)" />
        <button type="submit">Filter</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.length === 0 && <li>no jobs found (or db not setup yet)</li>}
        {jobs.map((job) => (
          <li key={job.id} style={{ border: "1px solid #ddd", padding: 14, marginBottom: 10, borderRadius: 8 }}>
            <Link href={`/jobs/${job.id}`}>
              <strong>{job.title}</strong>
            </Link>{" "}
            at {job.company} ({job.location})
            <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>tags: {job.tags.join(", ")}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
