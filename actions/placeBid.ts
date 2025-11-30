"use server";

import { db } from "@/db";
import { auction, bids } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

interface PlaceBidInput {
  auctionId: string;
  userId: string;
  amount: number;
}

export async function placeBid({ auctionId, userId, amount }: PlaceBidInput) {
  const [item] = await db
    .select()
    .from(auction)
    .where(eq(auction.id, auctionId));

  if (!item) {
    throw new Error("Auction not found");
  }

  const minRequired =
    (item.currentBid || item.startingBid || 0) + item.minimumIncrement;

  if (amount < minRequired) {
    throw new Error(`Bid too low. Minimum required bid: ₹${minRequired}`);
  }

  await db.insert(bids).values({
    id: nanoid(),
    auctionId,
    userId,
    amount,
    createdAt: new Date(),
  });

  await db
    .update(auction)
    .set({ currentBid: amount })
    .where(eq(auction.id, auctionId));

  return {
    success: true,
    message: "Bid placed successfully",
    currentBid: amount,
  };
}
