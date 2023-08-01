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
