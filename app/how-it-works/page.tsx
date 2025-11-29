"use client";

import {
  UserPlus,
  Search,
  Gavel,
  Trophy,
  ShieldCheck,
  Activity,
  BarChart,
  CheckCircle2,
  FileText,
  Headphones,
} from "lucide-react";

interface Step {
  title: string;
  desc: string;
  icon: keyof typeof IconMap;
}

interface Benefit {
  title: string;
  desc: string;
  icon: keyof typeof IconMap;
}

const IconMap = {
  UserPlus,
  Search,
  Gavel,
  Trophy,
  ShieldCheck,
  Activity,
  BarChart,
  CheckCircle2,
  FileText,
  Headphones,
};

export default function HowItWorksPage() {
  const steps: Step[] = [
    {
      title: "Register as Dealer",
      desc: "Create your dealer account with quick verification process",
      icon: "UserPlus",
    },
    {
      title: "Browse Auctions",
      desc: "Explore live and upcoming auctions across multiple locations",
      icon: "Search",
    },
    {
      title: "Place Your Bids",
      desc: "Bid on vehicles through our secure online platform",
      icon: "Gavel",
    },
    {
      title: "Win & Close Deal",
      desc: "Complete documentation and take delivery of your vehicle",
      icon: "Trophy",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Secure Transactions",
      desc: "Bank-grade security for all your bidding and payment transactions",
      icon: "ShieldCheck",
    },
    {
      title: "Real-Time Bidding",
      desc: "Live auction updates with instant bid notifications",
      icon: "Activity",
    },
    {
      title: "Market Insights",
      desc: "Access to market trends and vehicle pricing data",
      icon: "BarChart",
    },
    {
      title: "Verified Dealers",
      desc: "Join a network of trusted and verified dealer partners",
      icon: "CheckCircle2",
    },
    {
      title: "Complete Documentation",
      desc: "Full vehicle history and legal documentation support",
      icon: "FileText",
    },
    {
      title: "24/7 Support",
      desc: "Dedicated support team to assist you throughout the process",
      icon: "Headphones",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 md:px-14 lg:px-20">
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your path to seamless online vehicle auctions
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {steps.map((s, i) => {
          const Icon = IconMap[s.icon];
          return (
            <div
              key={i}
              className="p-6 rounded-2xl border bg-card hover:shadow-xl transition duration-300 text-center"
            >
              <Icon className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          );
        })}
      </section>

      <section className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover what makes our platform the most trusted choice for dealers
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {benefits.map((b, i) => {
          const Icon = IconMap[b.icon];
          return (
            <div
              key={i}
              className="p-6 rounded-2xl border bg-card hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <Icon className="w-8 h-8" />
                <h3 className="text-xl font-semibold">{b.title}</h3>
              </div>
              <p className="text-muted-foreground">{b.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
