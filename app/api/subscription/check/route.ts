import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasActiveSubscription } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ hasSubscription: false });
    }

    const hasSubscription = await hasActiveSubscription(session.user.id);

    return NextResponse.json({ hasSubscription });
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json({ hasSubscription: false });
  }
}
