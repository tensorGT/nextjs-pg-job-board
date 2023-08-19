import { NextRequest, NextResponse } from "next/server";
import { JobRow, pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  const tag = req.nextUrl.searchParams.get("tag")?.trim() || "";

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
  const result = await pool.query<JobRow>(`SELECT * FROM jobs ${where} ORDER BY created_at DESC`, vals);
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.title || !body.company) {
    return NextResponse.json({ error: "need title and company" }, { status: 400 });
  }
  const tags = Array.isArray(body.tags) ? body.tags : [];
