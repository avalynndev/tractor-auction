"use server";

import { db } from "@/db";
import { auction } from "@/schema";
import { eq } from "drizzle-orm"; 

export async function updateAuction(id: string, values: any) {
  await db
    .update(auction)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(auction.id, id));
}

export async function deleteAuction(id: string) {
  await db.delete(auction).where(eq(auction.id, id)); 
}
