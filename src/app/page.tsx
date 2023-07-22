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
