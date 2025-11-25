import { db } from "@/db";
import { auction } from "@/schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { desc } from "drizzle-orm";

export default async function AuctionsPage() {
  const auctions = await db
    .select()
    .from(auction)
    .orderBy(desc(auction.createdAt));

  return (
    <>
 <div className="max-w-6xl mx-auto p-4 flex flex-col items-center justify-center">
      <span className="tracking-tight text-center pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Current Auctions
      </span>
      </div>
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {auctions.map((item) => (
          <Link key={item.id} href={`/auctions/${item.id}`}>
            <Card className="hover:shadow-xl transition duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  Category: <span className="font-medium">{item.category}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Price:{" "}
                  <span className="font-medium">₹{item.price || "—"}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  State:{" "}
                  <span className="font-medium">{item.state || "—"}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
