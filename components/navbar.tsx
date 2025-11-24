"use client";
import React, { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import FadeImage from "@/components/ui/fade-image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { NavigationLinks, authLinks } from "@/config/navigation";
import { UserButton } from "@/components/user-button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky lg:absolute top-0 z-50 w-full p-2 transition-colors duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-container mx-auto">
          <nav
            data-slot="navbar"
            className="flex items-center justify-between p-2"
          >
            <nav
              data-slot="navbar-left"
              className="lg:pt-4 flex items-center justify-start gap-4"
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-md md:text-xl font-bold"
              >
                <FadeImage src="/logo.svg" alt="Logo" width={36} height={36} />
                <span className="hidden md:inline">Tractor Auction</span>
              </Link>
            </nav>
            <nav
              data-slot="navbar-right"
              className="lg:pt-5 flex items-center justify-end gap-4"
            >
              <Link
                href={authLinks.getStarted.href}
                data-slot="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow-sm dark:hover:from-primary/80 hover:from-primary/70 dark:hover:to-primary/70 hover:to-primary/90 bg-linear-to-b from-primary/60 to-primary dark:from-primary dark:to-primary/70 border-t-primary h-9 px-4 py-2"
              >
                {authLinks.getStarted.label}
              </Link>
              <UserButton/>

              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      data-slot="button"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9 shrink-0"
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-menu size-5"
                      >
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                      </svg>
                      <span className="sr-only">Toggle navigation menu</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="p-0 w-72 bg-background/70 backdrop-blur-md border-l border-border/30 shadow-lg"
                  >
                    <SheetHeader className="p-4 pb-2 border-b border-border/20">
                      <SheetTitle>
                        <Link
                          href="/"
                          className="flex items-center gap-2 text-lg font-semibold"
                        >
                          <FadeImage
                            src="/logo.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                          />
                          Tractor Auction
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-2 p-6">
                      <ul className="flex flex-col gap-2">
                        {NavigationLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group w-full text-left inline-flex h-9 items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </nav>
          </nav>
        </div>
      </header>

      <div className="max-w-[300px] sticky top-4 z-50 mx-auto hidden items-center justify-center p-3 lg:flex">
        <nav
          data-slot="navbar"
          className="flex items-center justify-between bg-background dark:bg-background/30 border-border dark:border-border/15 rounded-xl border p-1 backdrop-blur-lg"
        >
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            data-slot="navigation-menu"
            className="relative z-10 max-w-max flex-1 items-center justify-center hidden lg:flex"
          >
            <div style={{ position: "relative" }}>
              <ul
                data-orientation="horizontal"
                data-slot="navigation-menu-list"
                className="group flex flex-1 list-none items-center justify-center space-x-1"
                dir="ltr"
              >
                {NavigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
                      data-radix-collection-item=""
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </div>
          </nav>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
