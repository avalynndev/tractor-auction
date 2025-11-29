"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

export default function ImageUpload({
  setUrl,
  cover,
}: {
  setUrl: (url: string) => void;
  cover?: boolean;
}) {
  return (
    <UploadDropzone<OurFileRouter, "auctionImages">
      endpoint="auctionImages"
      config={{ mode: "auto" }}
      appearance={{
        container: `${cover && "py-24"} py-4 border-2 border-dashed border-muted-foreground rounded-lg`,
        uploadIcon: "text-muted-foreground",
        label: "text-foreground hover:text-primary",
        allowedContent: "text-muted-foreground",
        button:
          "bg-primary text-primary-foreground px-4 hover:bg-primary/90 ut-ready:bg-primary ut-uploading:bg-primary/50 ut-uploading:cursor-not-allowed",
      }}
      content={{
        button({ ready }) {
          if (ready) return "Upload Image";
          return "Getting ready...";
        },
        allowedContent: "PNG, JPG, WEBP (up to 16MB)",
      }}
      onClientUploadComplete={(res) => {
        if (!res?.[0]) return;
        setUrl(res[0].url);
        toast.success("Uploaded!");
      }}
      onUploadError={(e) => {
        toast.error(e.message);
      }}
    />
  );
}
