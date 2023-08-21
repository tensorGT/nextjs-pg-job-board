import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow, pool } from "@/lib/db";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const res = await pool.query<JobRow>("SELECT * FROM jobs WHERE id = $1", [id]);
  const job = res.rows[0];
  if (!job) notFound();

  return (
    <main style={{ maxWidth: 720, margin: "32px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <Link href="/">← back to jobs</Link>
      <h1>{job.title}</h1>
      <p>
        <strong>{job.company}</strong> • {job.location}
      </p>
      <p style={{ marginTop: 12 }}>{job.description}</p>
    </main>
  );
}
