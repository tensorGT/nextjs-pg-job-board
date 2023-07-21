import Link from "next/link";
import { JobRow, pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string };
