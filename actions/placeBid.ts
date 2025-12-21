"use server";

import { db } from "@/db";
import { auction, bids } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { hasActiveSubscription } from "@/lib/subscription";

interface PlaceBidInput {
  auctionId: string;
  userId: string;
  amount: number;
}

export async function placeBid({ auctionId, userId, amount }: PlaceBidInput) {
  const hasSubscription = await hasActiveSubscription(userId);

  if (!hasSubscription) {
    throw new Error(
      "You need an active subscription to place bids. Please upgrade your plan to continue.",
    );
  }

  return await db.transaction(async (tx) => {
    const [item] = await tx
      .select()
      .from(auction)
      .where(eq(auction.id, auctionId))
      .for("update");

    if (!item) {
      throw new Error("Auction not found");
    }

    // Check if auction has ended
    if (new Date() > item.endingAt) {
      throw new Error("This auction has ended");
    }

    const current = item.currentBid || item.startingBid || 0;
    const minRequired = current + item.minimumIncrement;

    if (amount < minRequired) {
      throw new Error(
        `Bid too low. Someone may have outbid you. Minimum required: ₹${minRequired.toLocaleString("en-IN")}`,
      );
    }

    await tx.insert(bids).values({
      id: nanoid(),
      auctionId,
      userId,
      amount,
      createdAt: new Date(),
    });

    await tx
      .update(auction)
      .set({
        currentBid: amount,
        updatedAt: new Date(),
      })
      .where(eq(auction.id, auctionId));

    return {
      success: true,
      message: "Bid placed successfully",
      currentBid: amount,
    };
  });
}
