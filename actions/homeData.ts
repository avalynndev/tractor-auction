import { db } from "@/db";
import { auction } from "@/schema";
import { desc } from "drizzle-orm";

const CATEGORY_OPTIONS = [
  "regular",
  "harvester",
  "preapproved",
  "scrap",
] as const;

export async function getHomeData() {
  const allAuctions = await db.select().from(auction);

  const categoryCounts: Record<string, number> = {};
  CATEGORY_OPTIONS.forEach((c) => {
    categoryCounts[c] = allAuctions.filter((a) => a.category === c).length;
  });

  const latest4 = await db
    .select()
    .from(auction)
    .orderBy(desc(auction.createdAt))
    .limit(4);

  return { categoryCounts, latest4 };
}
