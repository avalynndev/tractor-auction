"use client";

import { FileText, ShieldCheck, CheckCircle2, Truck } from "lucide-react";

import { Link } from "next-view-transitions";

interface PolicyItem {
  title: string;
  desc: string;
  href: string;
  icon: keyof typeof IconMap;
}

const IconMap = {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Truck,
};

export default function PoliciesPage() {
  const policies: PolicyItem[] = [
    {
      title: "Privacy Policy",
      desc: "How we collect, use and protect your personal data.",
      href: "/policy/privacy-policy",
      icon: "ShieldCheck",
    },
    {
      title: "Terms & Conditions",
      desc: "Understand the rules and guidelines for using our service.",
      href: "/policy/terms-conditions",
      icon: "CheckCircle2",
    },
    {
      title: "Refund & Cancellation",
      desc: "Learn about our refund eligibility and cancellation rules.",
      href: "/policy/cancellation-refund-policy",
      icon: "FileText",
    },
    {
      title: "Shipping Policy",
      desc: "Details about delivery timelines, logistics and shipment handling.",
      href: "/policy/shipping-policy",
      icon: "Truck",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 md:px-14 lg:px-20">
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">Our Policies</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about our terms and guidelines
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {policies.map((p, i) => {
          const Icon = IconMap[p.icon];
          return (
            <Link
              key={i}
              href={p.href}
              className="p-6 rounded-2xl border bg-card hover:shadow-xl transition duration-300 text-center block"
            >
              <Icon className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground">{p.desc}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
