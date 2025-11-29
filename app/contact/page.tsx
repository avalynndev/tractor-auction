"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import FadeImage from "@/components/ui/fade-image";

export default function ContactPage() {
  const contacts = [
    {
      title: "Phone",
      desc: "78 0109 4747",
      icon: Phone,
    },
    {
      title: "WhatsApp",
      desc: "78 0109 4343",
      icon: MessageCircle,
    },
    {
      title: "E-Mail",
      desc: "contact@tractorauction.in",
      icon: Mail,
    },
    {
      title: "Address",
      desc: "4-417/1, K K Road, Kakinada, Andhra Pradesh, 533016",
      icon: MapPin,
    },
    {
      title: "Working Hours",
      desc: "Mon-Sat: 9 AM - 7 PM | Sunday: Holiday",
      icon: Clock,
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "LinkedIn", icon: Linkedin },
  ];

  return (
    <>
      <section className="container max-w-container relative lg:pt-10 mx-auto rounded-3xl overflow-hidden">
        <div className="relative h-[60vh] w-full flex flex-col justify-between rounded-3xl">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <FadeImage
              src="/page.webp"
              alt="Bg Image"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/20 rounded-3xl" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-6 md:px-14 lg:px-20">
        <section className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-4">
            Change Your Business Way <br /> With Our New Way
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out to us for support, information, and partnership
            opportunities
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border bg-card hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <c.icon className="w-8 h-8" />
                <h3 className="text-xl font-semibold">{c.title}</h3>
              </div>
              <p className="text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </section>

        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border bg-card hover:shadow-lg transition cursor-pointer"
              >
                <s.icon className="w-6 h-6" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
