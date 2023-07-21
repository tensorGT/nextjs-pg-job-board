import { NextRequest, NextResponse } from "next/server";
import { JobRow, pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  const tag = req.nextUrl.searchParams.get("tag")?.trim() || "";
