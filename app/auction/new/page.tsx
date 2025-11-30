"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAuction } from "@/actions/createAuction";
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
import { ChevronDownIcon, Loader2, X } from "lucide-react";
import ImageUpload from "@/components/upload-thing";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

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
  const { data: session } = useSession();
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [endingDate, setEndingDate] = useState<Date>();
  const [endingTime, setEndingTime] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("regular");
  const [brand, setBrand] = useState("");

  const [coverImage, setCoverImage] = useState<NullableString>(null);

  const [battery, setBattery] = useState(false);
  const [bumper, setBumper] = useState(false);
  const [drawBar, setDrawBar] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [itch, setItch] = useState(false);
  const [nocPapers, setNocPapers] = useState(false);
  const [readyForToken, setReadyForToken] = useState(false);
  const [top, setTop] = useState(false);

  const [ipto, setIpto] = useState<string>("");
  const [clutch, setClutch] = useState<(typeof CLUTCH_OPTIONS)[number] | "">(
    "",
  );
  const [condition, setCondition] = useState<
    (typeof CONDITION_OPTIONS)[number] | ""
  >("");
  const [gearBox, setGearBox] = useState<(typeof GEARBOX_OPTIONS)[number] | "">(
    "",
  );
  const [steering, setSteering] = useState<
    (typeof STEERING_OPTIONS)[number] | ""
  >("");
  const [drive, setDrive] = useState<(typeof DRIVE_OPTIONS)[number] | "">("");

  const [horsepower, setHorsepower] = useState("");
  const [mfgYear, setMfgYear] = useState("");
  const [price, setPrice] = useState("");
  const [hoursRun, setHoursRun] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [tyres, setTyres] = useState("");
  const [tyrePercent, setTyrePercent] = useState("");
  const [state, setState] = useState<(typeof STATE_OPTIONS)[number] | "">("");
  const [verified, setVerified] = useState(false);
  const [expYear, setExpYear] = useState("");

  const [startingBid, setStartingBid] = useState("");
  const [minimumIncrement, setMinimumIncrement] = useState("500");

  const [submitting, setSubmitting] = useState(false);

  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const validate = () => {
    if (!session?.user?.id) return "You must be logged in to create an auction";
    if (!title.trim()) return "Title is required";
    if (!coverImage) return "Cover image is required";
    if (!category) return "Category is required";
    if (!clutch) return "Clutch selection is required";
    if (!gearBox) return "GearBox selection is required";
    if (!condition) return "Condition selection is required";
    if (!steering) return "Steering selection is required";
    if (!drive) return "Drive selection is required";
    if (!horsepower.trim()) return "Horsepower is required";
    if (!hoursRun.trim()) return "Hours run is required";
    if (!registrationNumber.trim()) return "Registration number is required";
    if (!endingDate || !endingTime) return "Ending date and time are required";
    if (!startingBid.trim()) return "Starting bid is required";
    if (!minimumIncrement.trim()) return "Minimum increment is required";

    if (isNaN(Number(startingBid)) || Number(startingBid) <= 0)
      return "Starting bid must be a positive number";
    if (isNaN(Number(minimumIncrement)) || Number(minimumIncrement) <= 0)
      return "Minimum increment must be a positive number";

    if ((category === "preapproved" || category === "scrap") && !price.trim())
      return "Price is required for preapproved/scrap";

    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);

    try {
      const finalEndingDate = new Date(endingDate!);

      const timeParts = endingTime.split(":").map(Number);
      const hours = timeParts[0];
      const minutes = timeParts[1];

      if (isNaN(hours) || isNaN(minutes)) {
        toast.error("Invalid time format");
        setSubmitting(false);
        return;
      }

      finalEndingDate.setHours(hours, minutes, 0, 0);

      if (isNaN(finalEndingDate.getTime())) {
        toast.error("Invalid date/time combination");
        setSubmitting(false);
        return;
      }

      await createAuction({
        id: crypto.randomUUID(),
        userId: session!.user!.id,
        title: title.trim(),
        category,
        brand: brand.trim() || null,
        coverImage: coverImage!,
        image1: additionalImages[0] ?? null,
        image2: additionalImages[1] ?? null,
        image3: additionalImages[2] ?? null,
        image4: additionalImages[3] ?? null,
        image5: additionalImages[4] ?? null,
        image6: additionalImages[5] ?? null,
        battery,
        bumper,
        drawBar,
        insurance,
        itch,
        nocPapers,
        readyForToken,
        top,
        ipto: ipto || null,
        clutch,
        condition,
        gearBox: gearBox || null,
        steering,
        drive,
        horsepower,
        mfgYear: mfgYear || null,
        price: price || null,
        hoursRun,
        registrationNumber,
        tyres: tyres || null,
        tyrePercent: tyrePercent || null,
        state: state || null,
        verified,
        expYear: expYear || null,
        endingAt: finalEndingDate,
        startingBid: Number(startingBid),
        minimumIncrement: Number(minimumIncrement),
      });

      setTitle("");
      setDescription("");
      setBrand("");
      setCoverImage(null);
      setAdditionalImages([]);
      setBattery(false);
      setBumper(false);
      setDrawBar(false);
      setInsurance(false);
      setItch(false);
      setNocPapers(false);
      setReadyForToken(false);
      setTop(false);
      setIpto("");
      setClutch("");
      setCondition("");
      setGearBox("");
      setSteering("");
      setDrive("");
      setHorsepower("");
      setMfgYear("");
      setPrice("");
      setHoursRun("");
      setRegistrationNumber("");
      setTyres("");
      setTyrePercent("");
      setState("");
      setVerified(false);
      setExpYear("");
      setEndingTime("");
      setEndingDate(undefined);
      setStartingBid("");
      setMinimumIncrement("500");

      router.refresh();
      toast.success("Auction created successfully! 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 grid gap-6">
      <div className="grid gap-6">
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
              <label className="font-medium">Ending Date *</label>

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="justify-between font-normal"
                  >
                    {endingDate
                      ? endingDate.toLocaleDateString()
                      : "Select date"}
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
              <label className="font-medium">Ending Time *</label>

              <div className="relative">
                <Input
                  type="time"
                  id="time-picker"
                  value={endingTime}
                  onChange={(e) => setEndingTime(e.target.value)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
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
                <Label>Starting Bid (₹) *</Label>
                <Input
                  type="number"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  placeholder="e.g. 100000"
                  min="1"
                />
              </div>

              <div className="grid gap-2">
                <Label>Minimum Increment (₹) *</Label>
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
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => setCoverImage(null)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
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
                <Label>Clutch *</Label>
                <Select
                  value={clutch}
                  onValueChange={(v) => setClutch(v as any)}
                >
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
                <Label>Condition *</Label>
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
                <Label>Gear Box *</Label>
                <Select
                  value={gearBox}
                  onValueChange={(v) => setGearBox(v as any)}
                >
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
                <Label>Steering *</Label>
                <Select
                  value={steering}
                  onValueChange={(v) => setSteering(v as any)}
                >
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
                <Label>Drive *</Label>
                <Select value={drive} onValueChange={(v) => setDrive(v as any)}>
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
                <Label>Horsepower (HP) *</Label>
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
                <Label>Hours Run *</Label>
                <Input
                  type="text"
                  value={hoursRun}
                  onChange={(e) => setHoursRun(e.target.value)}
                  placeholder="e.g. 1500"
                />
              </div>

              <div className="grid gap-2">
                <Label>Registration Number *</Label>
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
                <Label>
                  Price{" "}
                  {(category === "preapproved" || category === "scrap") && "*"}
                </Label>
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
                <Select value={state} onValueChange={(v) => setState(v as any)}>
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
            <CardDescription className="pb-2">
              Make sure required fields are filled before submitting.
            </CardDescription>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Auction"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
