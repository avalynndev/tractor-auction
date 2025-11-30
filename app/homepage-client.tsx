"use client";

import { Gavel, UserPlus, Info, Search } from "lucide-react";
import FadeImage from "@/components/ui/fade-image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { MorphingTextWithSkeleton } from "@/components/skleton-morphing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function HomePageClient({ data }: any) {
  const { categoryCounts, latest4 } = data;
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/auctions?s=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen px-4">
      <section className="container max-w-container relative md:pb-10 lg:pt-10 mx-auto rounded-3xl overflow-hidden">
        <div className="relative h-[80vh] min-h-[600px] w-full flex flex-col justify-between rounded-3xl">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <FadeImage
              src="/image_bg.png"
              alt="Bg Image"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/60 rounded-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
            <h1 className="font-breakfast text-[44px] font-black max-w-3xl sm:text-6xl md:text-8xl text-background dark:text-foreground">
              Find Your
              <MorphingTextWithSkeleton delay={150}>
                <MorphingText texts={["Best", "Right", "Next"]} />
              </MorphingTextWithSkeleton>
              Tractor
            </h1>

            <p className="mt-4 text-background/70 dark:text-muted-foreground sm:text-lg font-gaegu max-w-md lg:max-w-xl">
              Discover high-quality tractors and farm equipment at transparent,
              competitive auctions. Trusted sellers. Secure bidding. Zero hidden
              fees.
            </p>
          </div>

          <div className="relative z-10 w-full px-4 pb-8 md:pb-12 lg:pb-16 flex justify-center bg-black/30 backdrop-blur-xl pt-10 rounded-b-3xl">
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base flex items-center gap-2"
                >
                  <Info className="w-5 h-5" />
                  How It Works
                </Button>
              </Link>
              <Link href="/auctions">
                <Button
                  variant="default"
                  className="rounded-full px-8 py-6 text-base flex items-center gap-2"
                >
                  <Gavel className="w-5 h-5" />
                  Auctions
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full max-w-4xl mx-auto flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tractors…"
            className="flex-1 px-4 py-3 rounded-full bg-white/90 dark:bg-black/40 backdrop-blur-md text-black dark:text-white outline-none"
          />
          <Button
            onClick={handleSearch}
            className="rounded-full h-12 has-[>svg]:px-4 px-6 py-3 flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </Button>
        </div>
      </section>

      <section className="py-20">
        <Categories categoryCounts={categoryCounts} />
      </section>

      <section className="py-10">
        <LiveAuctions auctions={latest4} />
      </section>

      <section className="py-20">
        <Testimonials />
      </section>

      <section className="py-10">
        <BrandsCarousel />
      </section>
    </div>
  );
}

function Categories({
  categoryCounts,
}: {
  categoryCounts: Record<string, number>;
}) {
  const items = [
    { title: "Brand", key: "regular", img: "/brand.webp" },
    { title: "Harvester", key: "harvester", img: "/harvester.webp" },
    { title: "Pre Approved", key: "preapproved", img: "/pre-approved.webp" },
    { title: "Scrap", key: "scrap", img: "/scrap.webp" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative w-full aspect-3/4 rounded-2xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />

            <Badge className="absolute top-3 right-4 text-white font-semibold text-md">
              {categoryCounts[item.key]} Listings
            </Badge>

            <p className="absolute bottom-4 left-4 text-white font-semibold text-xl">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveAuctions({ auctions }: { auctions: any[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Live Auctions</h2>

      <div className="mt-2 mb-4">
        <Link href="/auctions">
          <Button>
            View All Auctions <ArrowRightIcon />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {auctions.map((a) => (
          <div
            key={a.id}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-card/40"
          >
            <div className="h-40 relative">
              <Image
                src={a.coverImage}
                alt={a.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="font-semibold text-lg">{a.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {a.description}
              </p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">₹ {a.currentBid}</span>

                <Link href={`/auctions/${a.id}`}>
                  <button className="px-3 py-1 rounded-full text-sm bg-primary text-white">
                    Bid Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Customer Name",
      role: "Farmer",
      text: "This is a placeholder testimonial about how great the platform is.",
      avatar: "/testimonial1.webp",
    },
    {
      name: "Buyer Name",
      role: "Agriculture Contractor",
      text: "Another placeholder testimonial showcasing trust and satisfaction.",
      avatar: "/testimonial2.webp",
    },
    {
      name: "Dealer Name",
      role: "Machinery Dealer",
      text: "Placeholder text describing a positive experience with auctions.",
      avatar: "/testimonial1.webp",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 border rounded-2xl shadow-sm bg-card/40 hover:shadow-md transition-all"
          >
              <div className="relative w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
       

            <p className="text-center text-sm text-muted-foreground">
              {t.text}
            </p>

            <div className="text-center mt-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsCarousel() {
  const brands = [
    "captain",
    "eicher",
    "ft",
    "jd",
    "escorts",
    "kubota",
    "mahindra",
    "nh",
    "powertrac",
    "sonalika",
    "swaraj",
    "tafe",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Brands</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="relative border rounded-xl shadow-sm bg-card/30 hover:shadow-md transition-all w-full h-32 overflow-hidden"
          >
            <Image
              src={`/${brand}.webp`}
              alt={brand}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
