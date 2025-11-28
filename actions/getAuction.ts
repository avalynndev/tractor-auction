"use server";

import { db } from "@/db";
import { auction } from "@/schema";
import { eq } from "drizzle-orm";

export async function getAuction(id: string) {
  const [data] = await db.select().from(auction).where(eq(auction.id, id));

  return data || null;
}
