"use server";

import { db } from "@/db";
import { auction } from "@/schema";

export async function createAuction(values: any) {
  await db.insert(auction).values({
    ...values,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return { success: true };
}
