import { AuctionFilterSheet } from "@/components/filters";
import { desc, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { auction } from "@/schema";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function AuctionsPage(props: {
  searchParams: Promise<any>;
}) {
  const searchParams = await props.searchParams;

  const {
    category,
    state,
    condition,
    clutch,
    gearbox,
    steering,
    drive,
    brand,
    tyres,
    tyre_percent,
    horsepower,
    mfg_year,
    price,
    hours_run,
    registration_number,
    ipto,
    battery,
    bumper,
    draw_bar,
    insurance,
    itch,
    noc_papers,
    ready_for_token,
    top,
  } = searchParams;

  const filters = [];

  if (category) filters.push(eq(auction.category, category));
  if (state) filters.push(eq(auction.state, state));
  if (condition) filters.push(eq(auction.condition, condition));
  if (clutch) filters.push(eq(auction.clutch, clutch));
  if (gearbox) filters.push(eq(auction.gearBox, gearbox));
  if (steering) filters.push(eq(auction.steering, steering));
  if (drive) filters.push(eq(auction.drive, drive));
  if (brand) filters.push(eq(auction.brand, brand));
  if (tyres) filters.push(eq(auction.tyres, tyres));
  if (tyre_percent) filters.push(eq(auction.tyrePercent, tyre_percent));
  if (horsepower) filters.push(eq(auction.horsepower, horsepower));
  if (mfg_year) filters.push(eq(auction.mfgYear, mfg_year));
  if (price) filters.push(eq(auction.price, price));
  if (hours_run) filters.push(eq(auction.hoursRun, hours_run));
  if (registration_number)
    filters.push(eq(auction.registrationNumber, registration_number));
  if (ipto) filters.push(eq(auction.ipto, ipto));

  if (battery === "true") filters.push(eq(auction.battery, true));
  if (bumper === "true") filters.push(eq(auction.bumper, true));
  if (draw_bar === "true") filters.push(eq(auction.drawBar, true));
  if (insurance === "true") filters.push(eq(auction.insurance, true));
  if (itch === "true") filters.push(eq(auction.itch, true));
  if (noc_papers === "true") filters.push(eq(auction.nocPapers, true));
  if (ready_for_token === "true") filters.push(eq(auction.readyForToken, true));
  if (top === "true") filters.push(eq(auction.top, true));

  const auctions = await db
    .select()
    .from(auction)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(auction.createdAt));

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 flex flex-col items-center justify-center">
        <span className="tracking-tight text-center pointer-events-none mt-8 whitespace-pre-wrap bg-linear-to-b from-black to-gray-300 bg-clip-text py-8 text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Current Auctions
        </span>

        <AuctionFilterSheet />
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {auctions.map((item) => (
            <Link key={item.id} href={`/auctions/${item.id}`}>
              <div
                key={item.id}
                className="border duration-200 cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-card/40"
              >
                <div className="relative w-full h-50 rounded-t-md overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <p className="font-semibold text-lg">
                    {item.title}{" "}
                    <span className="text-sm text-muted-foreground">
                      {`(${item.brand})`}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    {item.category === "preapproved" && (
                      <span className="text-primary font-bold">
                        ₹ {item.currentBid}
                      </span>
                    )}
                    <Badge>{new Date(item.endingAt).toLocaleString()}</Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
