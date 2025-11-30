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
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getAuction } from "@/actions/getAuction";

export default function PlaceBidDialog({
  item,
  session,
}: {
  item: any;
  session: any;
}) {
  const [newItem, setNewItem] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const current =
    newItem?.currentBid ?? item.currentBid ?? item.startingBid ?? 0;
  const minRequired = current + item.minimumIncrement;

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

      toast.success("Bid placed!");

      await reloadAuction();

      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to place bid");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg">Current Bid</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">₹{current}</div>

        {session?.user?.id ? (
          <Credenza open={open} onOpenChange={setOpen}>
            <CredenzaTrigger asChild>
              <Button className="w-full py-6 text-lg">Place Bid</Button>
            </CredenzaTrigger>

            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Place Your Bid</CredenzaTitle>
              </CredenzaHeader>

              <CredenzaBody className="space-y-4 pb-6">
                <p className="text-muted-foreground">
                  Minimum allowed bid:
                  <span className="font-semibold"> ₹{minRequired}</span>
                </p>

                <Input
                  type="number"
                  placeholder={`Enter at least ₹${minRequired}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
              </CredenzaBody>

              <CredenzaFooter>
                <CredenzaClose asChild>
                  <Button variant="outline">Cancel</Button>
                </CredenzaClose>

                <Button onClick={submitBid} disabled={loading}>
                  {loading ? "Placing..." : "Confirm Bid"}
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
        ) : (
          <>
            <Skeleton className="w-full h-14 rounded-md" />
            <div className="text-sm font-bold text-destructive">
              Please signup to place a bid
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
