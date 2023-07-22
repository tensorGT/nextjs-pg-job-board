import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow, pool } from "@/lib/db";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();
