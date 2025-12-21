"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, Home } from "lucide-react";
import { PLANS } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") as keyof typeof PLANS | null;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  const planConfig = plan ? PLANS[plan] : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>

          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>

          {planConfig && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 mb-6 border border-green-200 dark:border-green-800">
              <h2 className="text-lg font-semibold mb-2">
                {planConfig.name} Plan Activated
              </h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Duration: {planConfig.duration} days</p>
                <p>Credits: Unlimited bidding</p>
                <p className="font-medium text-green-700 dark:text-green-400 mt-3">
                  ₹{(planConfig.price / 100).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to home in {countdown} seconds...</span>
          </div>

          <Button onClick={() => router.push("/")} className="w-full" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            You will receive a confirmation email shortly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
