"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const format = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());

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

export function AuctionFilterSheet() {
  const router = useRouter();
  const params = useSearchParams();

  const [category, setCategory] = useState(params.get("category") || "");
  const [state, setState] = useState(params.get("state") || "");
  const [condition, setCondition] = useState(params.get("condition") || "");
  const [clutch, setClutch] = useState(params.get("clutch") || "");
  const [gearbox, setGearbox] = useState(params.get("gearbox") || "");
  const [steering, setSteering] = useState(params.get("steering") || "");
  const [drive, setDrive] = useState(params.get("drive") || "");

  const [brand, setBrand] = useState(params.get("brand") || "");
  const [tyres, setTyres] = useState(params.get("tyres") || "");
  const [tyrePercent, setTyrePercent] = useState(
    params.get("tyre_percent") || "",
  );
  const [horsepower, setHorsepower] = useState(params.get("horsepower") || "");
  const [mfgYear, setMfgYear] = useState(params.get("mfg_year") || "");
  const [price, setPrice] = useState(params.get("price") || "");
  const [hoursRun, setHoursRun] = useState(params.get("hours_run") || "");
  const [registrationNumber, setRegistrationNumber] = useState(
    params.get("registration_number") || "",
  );
  const [ipto, setIpto] = useState(params.get("ipto") || "");
  const [expYear, setExpYear] = useState(params.get("exp_year") || "");

  const [battery, setBattery] = useState(params.get("battery") === "true");
  const [bumper, setBumper] = useState(params.get("bumper") === "true");
  const [drawBar, setDrawBar] = useState(params.get("draw_bar") === "true");
  const [insurance, setInsurance] = useState(
    params.get("insurance") === "true",
  );
  const [itch, setItch] = useState(params.get("itch") === "true");
  const [nocPapers, setNocPapers] = useState(
    params.get("noc_papers") === "true",
  );
  const [readyForToken, setReadyForToken] = useState(
    params.get("ready_for_token") === "true",
  );
  const [top, setTop] = useState(params.get("top") === "true");

  const apply = () => {
    const search = new URLSearchParams();

    const fields: Record<string, any> = {
      category,
      state,
      condition,
      clutch,
      gearbox,
      steering,
      drive,
      brand,
      tyres,
      tyre_percent: tyrePercent,
      horsepower,
      mfg_year: mfgYear,
      price,
      hours_run: hoursRun,
      registration_number: registrationNumber,
      ipto,
      exp_year: expYear,
    };

    Object.entries(fields).forEach(([key, val]) => {
      if (val && val !== "") search.set(key, val);
    });

    const checks = {
      battery,
      bumper,
      draw_bar: drawBar,
      insurance,
      itch,
      noc_papers: nocPapers,
      ready_for_token: readyForToken,
      top,
    };

    Object.entries(checks).forEach(([key, val]) => {
      if (val) search.set(key, "true");
    });

    router.push(`/auctions?${search.toString()}`);
  };

  const clear = () => router.push("/auctions");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4">
          <MenuIcon />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="space-y-4 overflow-y-auto px-4 pt-4 pb-0"
      >
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-semibold">Filters</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-6 pb-4">
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={CATEGORY_OPTIONS}
          />
          <FilterSelect
            label="State"
            value={state}
            onChange={setState}
            options={STATE_OPTIONS}
          />
          <FilterSelect
            label="Condition"
            value={condition}
            onChange={setCondition}
            options={CONDITION_OPTIONS}
          />
          <FilterSelect
            label="Clutch"
            value={clutch}
            onChange={setClutch}
            options={CLUTCH_OPTIONS}
          />
          <FilterSelect
            label="Gearbox"
            value={gearbox}
            onChange={setGearbox}
            options={GEARBOX_OPTIONS}
          />
          <FilterSelect
            label="Steering"
            value={steering}
            onChange={setSteering}
            options={STEERING_OPTIONS}
          />
          <FilterSelect
            label="Drive"
            value={drive}
            onChange={setDrive}
            options={DRIVE_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Brand" value={brand} onChange={setBrand} />
          <InputField label="Tyres" value={tyres} onChange={setTyres} />
          <InputField
            label="Tyre %"
            value={tyrePercent}
            onChange={setTyrePercent}
          />
          <InputField
            label="Horsepower"
            value={horsepower}
            onChange={setHorsepower}
          />
          <InputField label="MFG Year" value={mfgYear} onChange={setMfgYear} />
          <InputField label="Price" value={price} onChange={setPrice} />
          <InputField
            label="Hours Run"
            value={hoursRun}
            onChange={setHoursRun}
          />
          <InputField
            label="Reg. Number"
            value={registrationNumber}
            onChange={setRegistrationNumber}
          />
          <InputField label="IPTO" value={ipto} onChange={setIpto} />
          <InputField label="EXP Year" value={expYear} onChange={setExpYear} />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Features</Label>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              ["Battery", battery, setBattery],
              ["Bumper", bumper, setBumper],
              ["Draw Bar", drawBar, setDrawBar],
              ["Insurance", insurance, setInsurance],
              ["Itch", itch, setItch],
              ["NOC Papers", nocPapers, setNocPapers],
              ["Ready For Token", readyForToken, setReadyForToken],
              ["Top", top, setTop],
            ].map(([lbl, val, fn]: any) => (
              <div key={lbl} className="flex items-center gap-2">
                <Checkbox
                  checked={val}
                  onCheckedChange={(v) => fn(v as boolean)}
                />
                <Label>{lbl}</Label>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 left-0 bg-background p-4 border-t flex gap-2 pb-3">
          <Button onClick={apply}>Apply Filters</Button>
          <Button variant="destructive" onClick={clear}>
            ✕ Clear All
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function FilterSelect({ label, value, onChange, options }: any) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Select
        value={value}
        onValueChange={(v) => onChange(v === "none" ? "" : v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {options.map((opt: string) => (
            <SelectItem key={opt} value={opt}>
              {format(opt)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}
