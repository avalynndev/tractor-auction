"use client";

import { ArrowRight, Gavel, UserPlus, Info } from "lucide-react";
import FadeImage from "@/components/ui/fade-image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { MorphingTextWithSkeleton } from "@/components/skleton-morphing";

export default function HomePage() {
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
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base flex items-center gap-2"
              >
                <Info className="w-5 h-5" />
                How It Works
              </Button>

              <Button
                variant="default"
                className="rounded-full px-8 py-6 text-base flex items-center gap-2"
              >
                <Gavel className="w-5 h-5" />
                Auction
              </Button>

              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Register
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-border/50 bg-card/30 p-8 shadow-lg rounded-3xl">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">ABOUT FKS</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FKS was a dream born on 8 February 1997 with an objective to
                give the child an education as a “child would want it,” an
                education which fostered emotional balance, and an education
                that instilled integrity.
              </p>
              <Link
                href="/main-campus/our-story"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors"
              >
                Know More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end">
              <FadeImage
                src="/Check.png"
                alt="FKS Students"
                width={600}
                height={400}
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
