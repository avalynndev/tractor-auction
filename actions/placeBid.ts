"use server";

import { db } from "@/db";
import { auction, bids } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

interface PlaceBidInput {
  auctionId: string;
  userId: string;
  amount: number;
}

export async function placeBid({ auctionId, userId, amount }: PlaceBidInput) {
  return await db.transaction(async (tx) => {
    const [item] = await tx
      .select()
      .from(auction)
      .where(eq(auction.id, auctionId))
      .for("update");

    if (!item) {
      throw new Error("Auction not found");
    }

    const current = item.currentBid || item.startingBid || 0;
    const minRequired = current + item.minimumIncrement;

    if (amount < minRequired) {
      throw new Error(
        `Bid too low. Someone may have outbid you. Minimum required: ₹${minRequired}`
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
      })
      .where(eq(auction.id, auctionId));

    return {
      success: true,
      message: "Bid placed successfully",
      currentBid: amount,
    };
  });
}
