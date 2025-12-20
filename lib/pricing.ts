// lib/pricing.ts
export const PLANS = {
  silver: {
    name: "Silver",
    duration: 30,
    price: 49900, // ₹499 in paise
    features: [
      "Unlimited bids",
      "30 days access",
      "Priority support",
      "Email notifications",
    ],
    badge: "1 Month",
    popular: false, // Add this
  },
  gold: {
    name: "Gold",
    duration: 180,
    price: 199900, // ₹1999 in paise
    features: [
      "Unlimited bids",
      "180 days access",
      "Priority support",
      "Advanced analytics",
      "Email & SMS notifications",
    ],
    badge: "6 Months",
    popular: true, // Already here
  },
  diamond: {
    name: "Diamond",
    duration: 365,
    price: 349900, // ₹3499 in paise
    features: [
      "Unlimited bids",
      "365 days access",
      "Premium support",
      "Advanced analytics",
      "All features",
      "API access",
    ],
    badge: "1 Year",
    popular: false, // Add this
  },
} as const;

export type PlanType = keyof typeof PLANS;
