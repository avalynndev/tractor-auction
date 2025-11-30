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

export default function HomePage() {
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
        <Categories />
      </section>

      <section className="py-10">
        <LiveAuctions />
      </section>

      <section className="py-20 bg-muted/20">
        <Testimonials />
      </section>

      <section className="py-10">
        <BrandsCarousel />
      </section>
    </div>
  );
}

function Categories() {
  const items = [
    {
      title: "Brand",
      img: "https://tractorauction.in/wp-content/uploads/2025/11/BRAND-CAT-2-400x533.png",
    },
    {
      title: "Harvester",
      img: "https://tractorauction.in/wp-content/uploads/2025/11/HARVESTER-CAT-2-400x533.png",
    },
    {
      title: "Pre Approved",
      img: "https://tractorauction.in/wp-content/uploads/2025/11/APPROVED-400x533.png",
    },
    {
      title: "Scrap",
      img: "https://tractorauction.in/wp-content/uploads/2025/11/SCRAP-CAAT-400x533.png",
    },
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
            <img src={item.img} alt="" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
            <Badge className="absolute top-3 right-4 text-white font-semibold text-md drop-shadow-lg">
              0 Listings
            </Badge>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-xl drop-shadow-lg">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveAuctions() {
  const placeholder = [1, 2, 3, 4];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Live Auctions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {placeholder.map((id) => (
          <div
            key={id}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-card/40"
          >
            <div className="h-40 bg-muted flex items-center justify-center">
              <span className="opacity-60 text-sm">Image</span>
            </div>

            <div className="p-4 space-y-2">
              <p className="font-semibold text-lg">Auction Title</p>
              <p className="text-sm text-muted-foreground">Description here</p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">₹ Current Bid</span>
                <button className="px-3 py-1 rounded-full text-sm bg-primary text-white">
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/auctions">
          <Button>
            View All Auctions <ArrowRightIcon />
          </Button>
        </Link>
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
      avatar: "/placeholder-avatar-1.png",
    },
    {
      name: "Buyer Name",
      role: "Agriculture Contractor",
      text: "Another placeholder testimonial showcasing trust and satisfaction.",
      avatar: "/placeholder-avatar-2.png",
    },
    {
      name: "Dealer Name",
      role: "Machinery Dealer",
      text: "Placeholder text describing a positive experience with auctions.",
      avatar: "/placeholder-avatar-3.png",
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
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <span className="opacity-60 text-xs">Img</span>
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
    "Mahindra",
    "Swaraj",
    "John Deere",
    "Kubota",
    "New Holland",
    "Powertrac",
    "Tafe",
    "Eicher",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Brands</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="border rounded-xl py-6 px-4 shadow-sm bg-card/30 flex items-center justify-center hover:shadow-md transition-all"
          >
            <div className="w-24 h-12 bg-muted flex items-center justify-center rounded">
              <span className="text-xs opacity-60">{brand} Logo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
