import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Footer, FooterBottom, FooterColumn, FooterContent } from "./ui/footer";
import { ModeToggle } from "./ui/mode-toggle";
import FadeImage from "@/components/ui/fade-image";
import { Link } from "next-view-transitions";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <FadeImage src="/logo.svg" alt="Logo" width={36} height={36} />,
  name = "Tractor Auction",
  columns = [
    {
      title: "Quick Link",
      links: [
        { text: "How It works", href: "/how-it-works" },
        { text: "Home", href: "/" },
        { text: "Auctions", href: "/auctions" },
        { text: "Contact", href: "/contact" },
        { text: "Policy", href: "/policy" },
      ],
    },
    {
      title: "Socials",
      links: [
        { text: "Facebook", href: "/" },
        { text: "Twitter", href: "/" },
        { text: "LinkedIn", href: "/" },
      ],
    },
  ],
  copyright = "© 2025 TractorAuction. All rights reserved.",
  policies = [
    { text: "Privacy Policy", href: "/policy/privacy-policy" },
    { text: "Sitemap", href: "/sitemap" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("w-full px-4 bg-transparent", className)}>
      <div className="max-w-container mx-auto">
        <Footer className="bg-transparent">
          <FooterContent>
            <FooterColumn className="col-span-2">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
              <p>
                Access thousands of quality pre-owned vehicles through our
                secure online auction platform. Join dealers nationwide in
                finding the best deals
              </p>
              <p>📞 +91 780 109 4747</p>
              <p>📧 contact@tractorauction.in</p>
            </FooterColumn>

            {columns.map((col, colIndex) => (
              <FooterColumn key={colIndex}>
                <h4 className="font-semibold mb-2">{col.title}</h4>
                <div className="flex flex-col gap-1">
                  {col.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="text-muted-foreground text-sm hover:underline"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </FooterColumn>
            ))}
          </FooterContent>

          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <Link key={index} href={policy.href}>
                  {policy.text}
                </Link>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
