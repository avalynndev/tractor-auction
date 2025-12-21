// lib/subscription.ts
import { db } from "@/db";
import { subscriptions } from "@/schema";
import { eq, and, gte } from "drizzle-orm";
import { type PlanType } from "./pricing";

export async function getUserSubscription(userId: string) {
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.isActive, true),
        gte(subscriptions.endDate, new Date()),
      ),
    )
    .orderBy(subscriptions.endDate)
    .limit(1);

  return subscription;
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return false;
  }

  // Double check if subscription is still valid
  return new Date() <= subscription.endDate;
}

export async function getUserPlan(userId: string): Promise<PlanType | null> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || new Date() > subscription.endDate) {
    return null;
  }

  return subscription.plan as PlanType;
}

export async function getSubscriptionDetails(userId: string) {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return null;
  }

  const now = new Date();
  const daysRemaining = Math.ceil(
    (subscription.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    plan: subscription.plan,
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    daysRemaining,
    isActive: subscription.isActive && now <= subscription.endDate,
    amount: subscription.amount,
    currency: subscription.currency,
  };
}
