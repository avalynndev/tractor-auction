"use client";

import { useRouter } from "next/navigation";
import { XCircle, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CanceledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">Payment Canceled</h1>

          <p className="text-muted-foreground mb-8">
            Your payment was canceled and no charges were made to your account.
          </p>

          <Alert className="mb-8">
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you encountered any issues during checkout, please contact our
              support team.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/pricing")}
              className="w-full"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            You can always upgrade your plan later from the pricing page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
