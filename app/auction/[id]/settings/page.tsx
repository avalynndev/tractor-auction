"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuction } from "@/actions/getAuction";
import { updateAuction, deleteAuction } from "@/actions/editAuction";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, X, ChevronDownIcon } from "lucide-react";
import ImageUpload from "@/components/upload-thing";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ReloadIcon } from "@radix-ui/react-icons";

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

export default function AuctionSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { id } = React.use(params);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("regular");
  const [brand, setBrand] = useState("");

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const [endingDate, setEndingDate] = useState<Date>();
  const [endingTime, setEndingTime] = useState<string>("");
  const [startingBid, setStartingBid] = useState("");
  const [minimumIncrement, setMinimumIncrement] = useState("");

  const [clutch, setClutch] = useState<(typeof CLUTCH_OPTIONS)[number] | "">(
    "",
  );
  const [condition, setCondition] = useState<
    (typeof CONDITION_OPTIONS)[number] | ""
  >("");
  const [gearBox, setGearBox] = useState("");
  const [steering, setSteering] = useState("");
  const [drive, setDrive] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [mfgYear, setMfgYear] = useState("");
  const [hoursRun, setHoursRun] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const [price, setPrice] = useState("");
  const [tyres, setTyres] = useState("");
  const [tyrePercent, setTyrePercent] = useState("");
  const [state, setState] = useState("");
  const [ipto, setIpto] = useState("");
  const [expYear, setExpYear] = useState("");
  const [verified, setVerified] = useState(false);

  const [battery, setBattery] = useState(false);
  const [bumper, setBumper] = useState(false);
  const [drawBar, setDrawBar] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [itch, setItch] = useState(false);
  const [nocPapers, setNocPapers] = useState(false);
  const [readyForToken, setReadyForToken] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
    async function loadAuction() {
      try {
        const data = await getAuction(id);
        if (data) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setCategory(
            (data.category as (typeof CATEGORY_OPTIONS)[number]) || "regular",
          );
          setBrand(data.brand || "");

          setCoverImage(data.coverImage || null);
          const images = [
            data.image1,
            data.image2,
            data.image3,
            data.image4,
            data.image5,
            data.image6,
          ].filter(Boolean);
          setAdditionalImages(images as string[]);

          if (data.endingAt) {
            const date = new Date(data.endingAt);
            setEndingDate(date);
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            setEndingTime(`${hours}:${minutes}`);
          }
          setStartingBid(data.startingBid?.toString() || "");
          setMinimumIncrement(data.minimumIncrement?.toString() || "");

          setClutch((data.clutch as (typeof CLUTCH_OPTIONS)[number]) || "");
          setCondition(
            (data.condition as (typeof CONDITION_OPTIONS)[number]) || "",
          );
          setGearBox(data.gearBox || "");
          setSteering(data.steering || "");
          setDrive(data.drive || "");
          setHorsepower(data.horsepower || "");
          setMfgYear(data.mfgYear || "");
          setHoursRun(data.hoursRun || "");
          setRegistrationNumber(data.registrationNumber || "");

          setPrice(data.price || "");
          setTyres(data.tyres || "");
          setTyrePercent(data.tyrePercent || "");
          setState(data.state || "");
          setIpto(data.ipto || "");
          setExpYear(data.expYear || "");
          setVerified(data.verified || false);

          setBattery(data.battery || false);
          setBumper(data.bumper || false);
          setDrawBar(data.drawBar || false);
          setInsurance(data.insurance || false);
          setItch(data.itch || false);
          setNocPapers(data.nocPapers || false);
          setReadyForToken(data.readyForToken || false);
          setTop(data.top || false);
        }
      } catch {
        toast.error("Failed to load auction");
      } finally {
        setLoading(false);
      }
    }

    loadAuction();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!coverImage) {
      toast.error("Cover image is required");
      return;
    }

    setSubmitting(true);
    try {
      let finalEndingDate: Date | undefined;
      if (endingDate && endingTime) {
        finalEndingDate = new Date(endingDate);
        const timeParts = endingTime.split(":").map(Number);
        const hours = timeParts[0];
        const minutes = timeParts[1];
        if (!isNaN(hours) && !isNaN(minutes)) {
          finalEndingDate.setHours(hours, minutes, 0, 0);
        }
      }

      await updateAuction(id, {
        title: title.trim(),
        description: description.trim() || null,
        category,
        brand: brand.trim() || null,
        coverImage,
        image1: additionalImages[0] ?? null,
        image2: additionalImages[1] ?? null,
        image3: additionalImages[2] ?? null,
        image4: additionalImages[3] ?? null,
        image5: additionalImages[4] ?? null,
        image6: additionalImages[5] ?? null,
        endingAt: finalEndingDate,
        startingBid: startingBid ? Number(startingBid) : undefined,
        minimumIncrement: minimumIncrement
          ? Number(minimumIncrement)
          : undefined,
        clutch: clutch || null,
        condition: condition || null,
        gearBox: gearBox || null,
        steering: steering || null,
        drive: drive || null,
        horsepower: horsepower || null,
        mfgYear: mfgYear || null,
        hoursRun: hoursRun || null,
        registrationNumber: registrationNumber || null,
        price: price || null,
        tyres: tyres || null,
        tyrePercent: tyrePercent || null,
        state: state || null,
        ipto: ipto || null,
        expYear: expYear || null,
        verified,
        battery,
        bumper,
        drawBar,
        insurance,
        itch,
        nocPapers,
        readyForToken,
        top,
      });
      toast.success("Auction updated successfully!");
    } catch {
      toast.error("Failed to update auction");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this auction?")) return;
    setSubmitting(true);
    try {
      await deleteAuction(id);
      toast.success("Auction deleted successfully!");
      router.push("/auctions");
    } catch {
      toast.error("Failed to delete auction");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
          <CardDescription>
            Title, category, brand and short description.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mahindra 275 DI"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category *</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as any)}
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
              <Label>Brand</Label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand if applicable"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Ending Date</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between font-normal"
                >
                  {endingDate ? endingDate.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endingDate}
                  onSelect={(date) => {
                    setEndingDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Ending Time</label>
            <Input
              type="time"
              value={endingTime}
              onChange={(e) => setEndingTime(e.target.value)}
              className="bg-background"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bidding Settings</CardTitle>
          <CardDescription>
            Configure starting bid and minimum bid increment.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Minimum Increment (₹)</Label>
              <Input
                type="number"
                value={minimumIncrement}
                onChange={(e) => setMinimumIncrement(e.target.value)}
                placeholder="e.g. 500"
                min="1"
              />
            </div>
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
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label>Cover Image *</Label>
            {coverImage ? (
              <div className="relative border-2 border-muted-foreground rounded-lg overflow-hidden aspect-video">
                <Image
                  src={coverImage}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-all">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setCoverImage(null)}
                  >
                    <X className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            ) : (
              <ImageUpload setUrl={(url) => setCoverImage(url)} cover />
            )}
          </div>

          <div className="grid gap-3">
            <Label>Additional Images (Optional)</Label>
            <p className="text-sm text-muted-foreground">
              Upload up to 6 additional images
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {additionalImages.map((image, index) => (
                <div
                  key={index}
                  className="relative border-2 border-muted-foreground rounded-lg overflow-hidden aspect-video"
                >
                  <Image
                    src={image}
                    alt={`Additional ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setAdditionalImages(
                          additionalImages.filter((_, i) => i !== index),
                        );
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {additionalImages.length < 6 && (
                <div className="rounded-lg aspect-video">
                  <ImageUpload
                    setUrl={(url) => {
                      if (additionalImages.length < 6) {
                        setAdditionalImages([...additionalImages, url]);
                      }
                    }}
                  />
                </div>
              )}
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
              <Select value={clutch} onValueChange={(v) => setClutch(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select clutch" />
                </SelectTrigger>
                <SelectContent>
                  {CLUTCH_OPTIONS.map((o) => {
                    const label = o.replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <SelectItem key={o} value={o}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Condition</Label>
              <Select
                value={condition}
                onValueChange={(v) => setCondition(v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITION_OPTIONS.map((o) => {
                    const label = o
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <SelectItem key={o} value={o}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Gear Box</Label>
              <Select value={gearBox} onValueChange={(v) => setGearBox(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gearbox" />
                </SelectTrigger>
                <SelectContent>
                  {GEARBOX_OPTIONS.map((o) => {
                    const label = o.replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <SelectItem key={o} value={o}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Steering</Label>
              <Select value={steering} onValueChange={(v) => setSteering(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select steering" />
                </SelectTrigger>
                <SelectContent>
                  {STEERING_OPTIONS.map((o) => {
                    const label = o.replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <SelectItem key={o} value={o}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Drive</Label>
              <Select value={drive} onValueChange={(v) => setDrive(v)}>
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
                type="text"
                value={horsepower}
                onChange={(e) => setHorsepower(e.target.value)}
                placeholder="e.g. 50"
              />
            </div>

            <div className="grid gap-2">
              <Label>Manufacturing Year</Label>
              <Input
                type="text"
                value={mfgYear}
                onChange={(e) => setMfgYear(e.target.value)}
                placeholder="e.g. 2020"
              />
            </div>

            <div className="grid gap-2">
              <Label>Hours Run</Label>
              <Input
                type="text"
                value={hoursRun}
                onChange={(e) => setHoursRun(e.target.value)}
                placeholder="e.g. 1500"
              />
            </div>

            <div className="grid gap-2">
              <Label>Registration Number</Label>
              <Input
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="e.g. TN-01-AB-1234"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
              <Label>Price</Label>
              <Input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 500000"
              />
            </div>

            <div className="grid gap-2">
              <Label>Tyres</Label>
              <Input
                value={tyres}
                onChange={(e) => setTyres(e.target.value)}
                placeholder="e.g. MRF"
              />
            </div>

            <div className="grid gap-2">
              <Label>Tyre %</Label>
              <Input
                type="text"
                value={tyrePercent}
                onChange={(e) => setTyrePercent(e.target.value)}
                placeholder="e.g. 80"
              />
            </div>

            <div className="grid gap-2">
              <Label>State</Label>
              <Select value={state} onValueChange={(v) => setState(v)}>
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
              <Label>IPTO</Label>
              <Select value={ipto} onValueChange={(v) => setIpto(v)}>
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
              <Label>Expiry Year</Label>
              <Input
                type="text"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                placeholder="e.g. 2025"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={verified}
                onCheckedChange={(v) => setVerified(Boolean(v))}
              />
              <Label>Verified</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={battery}
                onCheckedChange={(v) => setBattery(Boolean(v))}
              />
              <span className="text-sm">Battery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={bumper}
                onCheckedChange={(v) => setBumper(Boolean(v))}
              />
              <span className="text-sm">Bumper</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={drawBar}
                onCheckedChange={(v) => setDrawBar(Boolean(v))}
              />
              <span className="text-sm">Draw Bar</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={insurance}
                onCheckedChange={(v) => setInsurance(Boolean(v))}
              />
              <span className="text-sm">Insurance</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={itch}
                onCheckedChange={(v) => setItch(Boolean(v))}
              />
              <span className="text-sm">Itch</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={nocPapers}
                onCheckedChange={(v) => setNocPapers(Boolean(v))}
              />
              <span className="text-sm">NOC Papers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={readyForToken}
                onCheckedChange={(v) => setReadyForToken(Boolean(v))}
              />
              <span className="text-sm">Ready for Token</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={top}
                onCheckedChange={(v) => setTop(Boolean(v))}
              />
              <span className="text-sm">Top</span>
            </label>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 rounded-b-xl p-4 flex items-center justify-between">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={submitting}
          >
            Delete Auction
          </Button>
          <Button onClick={handleUpdate} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Auction"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
