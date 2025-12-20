// app/pricing/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles, Award, Gem, ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/pricing";
import { toast } from "sonner";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: "silver" | "gold" | "diamond") => {
    try {
      setLoading(plan);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const planIcons = {
    silver: Sparkles,
    gold: Award,
    diamond: Gem,
  };

  const planColors = {
    silver: "border-gray-300",
    gold: "border-yellow-500 shadow-lg scale-105",
    diamond: "border-blue-500",
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Get unlimited access to place bids on all auctions. Choose the plan
          that works best for you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {(["silver", "gold", "diamond"] as const).map((planKey) => {
          const plan = PLANS[planKey];
          const Icon = planIcons[planKey];

          return (
            <Card key={planKey} className={`relative ${planColors[planKey]}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardDescription className="text-base">
                  {plan.badge}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">
                    ₹{(plan.price / 100).toFixed(0)}
                  </span>
                  <span className="text-muted-foreground ml-2 text-lg">
                    / {plan.duration} days
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full py-6 text-lg group"
                  onClick={() => handleCheckout(planKey)}
                  disabled={loading !== null}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {loading === planKey ? (
                    "Processing..."
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          All plans include unlimited bidding access. Choose based on how long
          you need access.
        </p>
      </div>
    </div>
  );
}
