import { db } from "@/db";
import { auction } from "@/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function AuctionDetails({
  params,
}: {
  params: { id: string };
}) {
  const [item] = await db
    .select()
    .from(auction)
    .where(eq(auction.id, "69d9869d-fe41-4dbe-8e9c-9431c3b8b77a"));

  if (!item) return <div className="p-6">Auction not found</div>;

  const images = [
    item.coverImage,
    item.image1,
    item.image2,
    item.image3,
    item.image4,
    item.image5,
    item.image6,
  ].filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-64 rounded-md overflow-hidden border"
          >
            <Image src={src!} alt="image" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Basic Details */}
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Brand:</span> {item.brand || "—"}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {item.category}
        </p>
        <p>
          <span className="font-semibold">Horsepower:</span> {item.horsepower}
        </p>
        <p>
          <span className="font-semibold">Hours Run:</span> {item.hoursRun}
        </p>
        <p>
          <span className="font-semibold">Manufacturing Year:</span>{" "}
          {item.mfgYear || "—"}
        </p>
        <p>
          <span className="font-semibold">Registration No:</span>{" "}
          {item.registrationNumber}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ₹{item.price || "—"}
        </p>
        <p>
          <span className="font-semibold">State:</span> {item.state || "—"}
        </p>

        {/* Conditions */}
        <p>
          <span className="font-semibold">Clutch:</span> {item.clutch}
        </p>
        <p>
          <span className="font-semibold">Condition:</span> {item.condition}
        </p>
        <p>
          <span className="font-semibold">Gear Box:</span> {item.gearBox}
        </p>
        <p>
          <span className="font-semibold">Steering:</span> {item.steering}
        </p>
        <p>
          <span className="font-semibold">Drive:</span> {item.drive}
        </p>

        {/* Optional flags */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Included Features</h2>
          <ul className="list-disc ml-6">
            {item.battery && <li>Battery</li>}
            {item.bumper && <li>Bumper</li>}
            {item.drawBar && <li>Drawbar</li>}
            {item.insurance && <li>Insurance</li>}
            {item.itch && <li>Itch</li>}
            {item.nocPapers && <li>NOC Papers</li>}
            {item.readyForToken && <li>Ready for Token</li>}
            {item.top && <li>Top</li>}
          </ul>
        </div>

        {/* Description */}
        {item.description && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{item.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
