"use server";

import { db } from "@/db";
import { user } from "@/schema";
import { eq } from "drizzle-orm";

export async function getUserMode(userId: string) {
  try {
    const [u] = await db
      .select({ mode: user.mode })
      .from(user)
      .where(eq(user.id, userId));

    return u?.mode ?? false;
  } catch (e) {
    console.error("Failed to fetch user mode:", e);
    return false;
  }
}

export async function updateUserMode(userId: string, mode: boolean) {
  try {
    await db.update(user).set({ mode }).where(eq(user.id, userId));

    return { success: true };
  } catch (e) {
    console.error("Failed to update mode:", e);
    return { success: false };
  }
}
