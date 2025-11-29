"use client";

import Image from "next/image";
import { getAuction } from "@/actions/getAuction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function AuctionDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [item, setItem] = useState<any>(null);
  const { id } = React.use(params);

  useEffect(() => {
    async function load() {
      const data = await getAuction(await id);
      setItem(data);
    }
    load();
  }, [id]);

  if (!item) return <div className="p-6">Loading...</div>;

  const images = [
    item.image1,
    item.image2,
    item.image3,
    item.image4,
    item.image5,
    item.image6,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-18">
      <div className="lg:col-span-2 space-y-10">
        <div className="relative w-full h-[420px] rounded-md overflow-hidden border">
          <Image
            src={item.coverImage}
            alt="cover"
            fill
            className="object-cover"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Spec label="Brand" value={item.brand} />
              <Spec label="Category" value={item.category} />
              <Spec label="Horsepower" value={item.horsepower} />
              <Spec label="Hours Run" value={item.hoursRun} />
              <Spec label="Mfg Year" value={item.mfgYear} />
              <Spec label="Registration No." value={item.registrationNumber} />
              <Spec label="State" value={item.state} />
              <Spec label="Price" value={item.price ? `₹${item.price}` : "—"} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Spec label="Clutch" value={item.clutch} />
              <Spec label="Condition" value={item.condition} />
              <Spec label="Gear Box" value={item.gearBox} />
              <Spec label="Steering" value={item.steering} />
              <Spec label="Drive" value={item.drive} />
              <Spec label="IPTO" value={item.ipto} />
              <Spec label="Tyres" value={item.tyres} />
              <Spec
                label="Tyre Condition"
                value={item.tyrePercent ? `${item.tyrePercent}%` : null}
              />
              <Spec label="Exp Year" value={item.expYear} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features & Accessories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <Feature label="Battery" checked={item.battery} />
              <Feature label="Bumper" checked={item.bumper} />
              <Feature label="Draw Bar" checked={item.drawBar} />
              <Feature label="Insurance" checked={item.insurance} />
              <Feature label="Itch" checked={item.itch} />
              <Feature label="NOC Papers" checked={item.nocPapers} />
              <Feature label="Ready for Token" checked={item.readyForToken} />
              <Feature label="Top" checked={item.top} />
              <Feature label="Verified" checked={item.verified} />
            </div>
          </CardContent>
        </Card>

        {item.description && (
          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6">{item.description}</p>
            </CardContent>
          </Card>
        )}

        <ImageGroup images={images} />
      </div>

      <Card className="h-fit sticky top-4">
        <CardHeader>
          <CardTitle className="text-lg">Current Bid</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">₹{item.currentBid || 0}</div>

          <Button className="w-full py-6 text-lg">Place Bid</Button>

          <Button variant="outline" className="w-full py-6 text-lg">
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Spec({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}

function ImageGroup({ images }: { images: string[] }) {
  if (!images.length) return null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-40 overflow-hidden rounded-md border"
          >
            <Image src={src} alt={src} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Feature({
  label,
  checked,
}: {
  label: string;
  checked?: boolean | null;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
          checked ? "bg-green-500 border-green-500" : "border-gray-300"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className={checked ? "font-medium" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}
