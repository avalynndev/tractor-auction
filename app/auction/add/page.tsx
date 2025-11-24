"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload, Trash2 } from "lucide-react";

const CLUTCH_OPTIONS = ["dual", "single"] as const;
const CONDITION_OPTIONS = ["push_start", "self_start", "towing"] as const;
const GEARBOX_OPTIONS = [
  "collarshift",
  "constant",
  "other",
  "semi_constant",
  "sliding",
  "synchro",
] as const;
const STEERING_OPTIONS = ["mechanical", "power"] as const;
const DRIVE_OPTIONS = ["2WD", "4WD"] as const;
const CATEGORY_OPTIONS = [
  "regular",
  "harvester",
  "preapproved",
  "scrap",
] as const;
const STATE_OPTIONS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
] as const;

type NullableString = string | null;

export default function AddAuctionPage() {
  const { data: session, } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const isPending = false
  // Basic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("regular");
  const [brand, setBrand] = useState("");

  // Images
  const [coverImage, setCoverImage] = useState<NullableString>(null);
  const [otherImages, setOtherImages] = useState<Array<NullableString>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  // Checkboxes
  const [battery, setBattery] = useState(false);
  const [bumper, setBumper] = useState(false);
  const [drawBar, setDrawBar] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [itch, setItch] = useState(false);
  const [nocPapers, setNocPapers] = useState(false);
  const [readyForToken, setReadyForToken] = useState(false);
  const [topFlag, setTopFlag] = useState(false);

  // Dropdowns / enums
  const [ipto, setIpto] = useState<"yes" | "no" | "">("");
  const [clutch, setClutch] = useState<(typeof CLUTCH_OPTIONS)[number] | "">(
    ""
  );
  const [condition, setCondition] = useState<
    (typeof CONDITION_OPTIONS)[number] | ""
  >("");
  const [gearBox, setGearBox] = useState<(typeof GEARBOX_OPTIONS)[number] | "">(
    ""
  );
  const [steering, setSteering] = useState<
    (typeof STEERING_OPTIONS)[number] | ""
  >("");
  const [drive, setDrive] = useState<(typeof DRIVE_OPTIONS)[number] | "">("");

  // Numeric / strings
  const [horsepower, setHorsepower] = useState<number | "">("");
  const [mfgYear, setMfgYear] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [hoursRun, setHoursRun] = useState<number | "">("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [tyres, setTyres] = useState("");
  const [tyrePercent, setTyrePercent] = useState<number | "">("");
  const [state, setState] = useState<(typeof STATE_OPTIONS)[number] | "">("");
  const [verified, setVerified] = useState(false);
  const [expYear, setExpYear] = useState<number | "">("");
  const [currentBid, setCurrentBid] = useState<number | "">("");

  // Owner
  const [owner, setOwner] = useState<string | null>(null);

  // loading
  const [submitting, setSubmitting] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    // Default owner to session user
    if (session?.user) {
      setOwner(session.user.id);
    }
  }, [session]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to convert file to base64"));
      };
      reader.onerror = reject;
    });
  };

  const handleCoverSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file for cover");
      return;
    }
    setImageLoading(true);
    try {
      const b = await convertFileToBase64(file);
      setCoverImage(b);
      toast.success("Cover image selected");
    } catch (e: any) {
      toast.error(e.message || "Failed to read cover image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleOtherImageSelect = async (file: File, index: number) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setImageLoading(true);
    try {
      const b = await convertFileToBase64(file);
      setOtherImages((prev) => {
        const copy = [...prev];
        copy[index] = b;
        return copy;
      });
      toast.success("Image added");
    } catch (e: any) {
      toast.error(e.message || "Failed to read image");
    } finally {
      setImageLoading(false);
    }
  };

  const removeOtherImage = (index: number) => {
    setOtherImages((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!coverImage) return "Cover image is required";
    if (!category) return "Category is required";
    if (!clutch) return "Clutch selection is required";
    if (!steering) return "Steering selection is required";
    if (!drive) return "Drive selection is required";
    if (!horsepower && horsepower !== 0) return "Horsepower is required";
    if (!hoursRun && hoursRun !== 0) return "Hours run is required";
    if (!registrationNumber.trim()) return "Registration number is required";
    if (
      (category === "preapproved" || category === "scrap") &&
      !price &&
      price !== 0
    )
      return "Price is required for preapproved/scrap";
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        category,
        brand: brand || null,
        images: [coverImage, ...otherImages.filter(Boolean)],
        checks: {
          battery,
          bumper,
          drawBar,
          insurance,
          itch,
          nocPapers,
          readyForToken,
          top: topFlag,
        },
        ipto: ipto || null,
        clutch: clutch || null,
        condition: condition || null,
        gearBox: gearBox || null,
        steering: steering || null,
        drive: drive || null,
        horsepower: Number(horsepower),
        mfgYear: mfgYear ? Number(mfgYear) : null,
        price: price ? Number(price) : null,
        hoursRun: Number(hoursRun),
        registrationNumber: registrationNumber.trim(),
        tyres: tyres || null,
        tyrePercent: tyrePercent ? Number(tyrePercent) : null,
        state: state || null,
        verified,
        expYear: expYear ? Number(expYear) : null,
        currentBid: currentBid ? Number(currentBid) : null,
        owner,
      } as const;

      // call your API route to create auction
      const res = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.message || "Failed to create auction");
      }

      const data = await res.json();
      toast.success("Auction created successfully");
      // redirect to auction page if id returned
      if (data?.id) window.location.href = `/auctions/${data.id}`;
    } catch (err: any) {
      toast.error(err.message || "Failed to create auction");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4  grid gap-6">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
            <CardDescription>
              Title, category, brand and short description.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mahindra 275 DI"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) =>
                    setCategory(v as (typeof CATEGORY_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Brand (optional)</Label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand if applicable"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description (optional)</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
              Upload one cover image (required) and up to 6 additional images.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Cover Image (required)</Label>
              <div className="flex items-center gap-3">
                <div className="w-36 h-24 border rounded overflow-hidden flex items-center justify-center bg-muted">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="cover"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      No cover
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleCoverSelect(e.target.files[0])
                    }
                  />
                  {coverImage && (
                    <Button variant="ghost" onClick={() => setCoverImage(null)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label>Additional Images (optional)</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {otherImages.map((img, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-28 h-20 border rounded overflow-hidden bg-muted flex items-center justify-center">
                      {img ? (
                        <img src={img} className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          Empty
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleOtherImageSelect(e.target.files[0], i)
                        }
                      />
                      {img && (
                        <Button
                          variant="ghost"
                          onClick={() => removeOtherImage(i)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tractor Specs</CardTitle>
            <CardDescription>
              Clutch, condition, gearbox, steering, drive, HP and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Clutch</Label>
                <Select
                  value={clutch}
                  onValueChange={(v) =>
                    setClutch(v as (typeof CLUTCH_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select clutch" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLUTCH_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Condition (optional)</Label>
                <Select
                  value={condition}
                  onValueChange={(v) =>
                    setCondition(v as (typeof CONDITION_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Gear Box (optional)</Label>
                <Select
                  value={gearBox}
                  onValueChange={(v) =>
                    setGearBox(v as (typeof GEARBOX_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gearbox" />
                  </SelectTrigger>
                  <SelectContent>
                    {GEARBOX_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Steering</Label>
                <Select
                  value={steering}
                  onValueChange={(v) =>
                    setSteering(v as (typeof STEERING_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select steering" />
                  </SelectTrigger>
                  <SelectContent>
                    {STEERING_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Drive</Label>
                <Select
                  value={drive}
                  onValueChange={(v) =>
                    setDrive(v as (typeof DRIVE_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drive" />
                  </SelectTrigger>
                  <SelectContent>
                    {DRIVE_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Horsepower (HP)</Label>
                <Input
                  type="number"
                  value={horsepower as any}
                  onChange={(e) =>
                    setHorsepower(e.target.value ? Number(e.target.value) : "")
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Manufacturing Year (optional)</Label>
                <Input
                  type="number"
                  value={mfgYear as any}
                  onChange={(e) =>
                    setMfgYear(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Hours Run</Label>
                <Input
                  type="number"
                  value={hoursRun as any}
                  onChange={(e) =>
                    setHoursRun(e.target.value ? Number(e.target.value) : "")
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Registration Number</Label>
                <Input
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optional + Checks */}
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Optional / Extras</CardTitle>
            <CardDescription>
              Checkboxes, price, tyres, state and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Price (required for preapproved/scrap)</Label>
                <Input
                  type="number"
                  value={price as any}
                  onChange={(e) =>
                    setPrice(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Tyres (optional)</Label>
                <Input
                  value={tyres}
                  onChange={(e) => setTyres(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Tyre % (optional)</Label>
                <Input
                  type="number"
                  value={tyrePercent as any}
                  onChange={(e) =>
                    setTyrePercent(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>State (optional)</Label>
                <Select
                  value={state}
                  onValueChange={(v) =>
                    setState(v as (typeof STATE_OPTIONS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATE_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>IPTO (optional)</Label>
                <Select
                  value={ipto}
                  onValueChange={(v) => setIpto(v as "yes" | "no" | "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Verified</Label>
                <Checkbox
                  checked={verified}
                  onCheckedChange={(v) => setVerified(Boolean(v))}
                />
              </div>

              <div className="grid gap-2">
                <Label>Expiry Year (optional)</Label>
                <Input
                  type="number"
                  value={expYear as any}
                  onChange={(e) =>
                    setExpYear(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Current Bid (optional)</Label>
                <Input
                  type="number"
                  value={currentBid as any}
                  onChange={(e) =>
                    setCurrentBid(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={battery}
                  onCheckedChange={(v) => setBattery(Boolean(v))}
                />{" "}
                <span>Battery</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={bumper}
                  onCheckedChange={(v) => setBumper(Boolean(v))}
                />{" "}
                <span>Bumper</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={drawBar}
                  onCheckedChange={(v) => setDrawBar(Boolean(v))}
                />{" "}
                <span>Draw Bar</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={insurance}
                  onCheckedChange={(v) => setInsurance(Boolean(v))}
                />{" "}
                <span>Insurance</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={itch}
                  onCheckedChange={(v) => setItch(Boolean(v))}
                />{" "}
                <span>Itch</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={nocPapers}
                  onCheckedChange={(v) => setNocPapers(Boolean(v))}
                />{" "}
                <span>NOC Papers</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={readyForToken}
                  onCheckedChange={(v) => setReadyForToken(Boolean(v))}
                />{" "}
                <span>Ready for Token</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={topFlag}
                  onCheckedChange={(v) => setTopFlag(Boolean(v))}
                />{" "}
                <span>Top</span>
              </label>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-sidebar rounded-b-xl p-4 flex items-center">
            <CardDescription className="pb-2">
              Make sure required fields are filled before submitting.
            </CardDescription>
            <Button type="submit" className="ml-auto" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Create Auction"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
