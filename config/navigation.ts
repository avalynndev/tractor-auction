export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export const NavigationLinks: NavigationLink[] = [
  {
    href: "/how-it-works",
    label: "How it Works",
  },
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/auctions",
    label: "Auctions",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/policy",
    label: "Policy",
  },
];

export const authLinks = {
  getStarted: {
    href: "/",
    label: "Sign Up",
  },
};
