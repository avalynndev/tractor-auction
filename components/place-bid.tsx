"use client";

import { useEffect, useState } from "react";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { placeBid } from "@/actions/placeBid";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getAuction } from "@/actions/getAuction";
import { Crown, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function PlaceBidDialog({
  item,
  session,
  hasSubscription,
  checkingSubscription,
}: {
  item: any;
  session: any;
  hasSubscription?: boolean;
  checkingSubscription?: boolean;
}) {
  const [newItem, setNewItem] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const current =
    newItem?.currentBid ?? item.currentBid ?? item.startingBid ?? 0;

  const minRequired = current + item.minimumIncrement;

  const isEnded =
    item.ended ||
    (item.endingAt && new Date(item.endingAt) < new Date()) ||
    item.status === "ENDED";

  async function reloadAuction() {
    try {
      const data = await getAuction(item.id);
      setNewItem(data);
    } catch (err) {
      console.error("Failed to fetch auction", err);
    }
  }

  useEffect(() => {
    reloadAuction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  async function submitBid() {
    const bidAmount = Number(amount);

    if (bidAmount < minRequired) {
      toast.error(`Minimum bid amount is ₹${minRequired}`);
      return;
    }

    try {
      setLoading(true);

      await placeBid({
        auctionId: item.id,
        userId: session.user.id,
        amount: bidAmount,
      });

      toast.success("Bid placed successfully!");
      await reloadAuction();
      setAmount("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to place bid");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Place your Bid</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {item.category === "preapproved" && (
          <div className="text-3xl font-bold">
            ₹ {current.toLocaleString("en-IN")}
          </div>
        )}

        {isEnded ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This auction has ended. Bidding is no longer available.
            </AlertDescription>
          </Alert>
        ) : checkingSubscription ? (
          <div className="flex items-center justify-center py-6">
            <ReloadIcon className="h-5 w-5 animate-spin" />
          </div>
        ) : !session?.user?.id ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please{" "}
              <Link href="/signin" className="font-semibold underline">
                sign in
              </Link>{" "}
              to place a bid
            </AlertDescription>
          </Alert>
        ) : !hasSubscription ? (
          <div className="space-y-3">
            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                You need an active subscription to place bids
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full py-6 text-lg" variant="default">
              <Link href="/pricing">
                <Crown className="mr-2 h-5 w-5" />
                Upgrade to Premium
              </Link>
            </Button>
          </div>
        ) : (
          <Credenza open={open} onOpenChange={setOpen}>
            <CredenzaTrigger asChild>
              <Button className="w-full py-6 text-lg">Place Bid</Button>
            </CredenzaTrigger>

            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Place Your Bid</CredenzaTitle>
              </CredenzaHeader>

              <CredenzaBody className="space-y-4 pb-6">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    Current bid:{" "}
                    <span className="font-semibold text-foreground">
                      ₹{current.toLocaleString("en-IN")}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Minimum bid:{" "}
                    <span className="font-semibold text-foreground">
                      ₹{minRequired.toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>

                <Input
                  type="number"
                  placeholder={`Enter at least ₹${minRequired.toLocaleString(
                    "en-IN",
                  )}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                  min={minRequired}
                />
              </CredenzaBody>

              <CredenzaFooter>
                <CredenzaClose asChild>
                  <Button variant="outline">Cancel</Button>
                </CredenzaClose>

                <Button onClick={submitBid} disabled={loading || !amount}>
                  {loading ? "Placing..." : "Confirm Bid"}
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
        )}
      </CardContent>
    </Card>
  );
}
