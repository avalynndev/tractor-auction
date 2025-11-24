import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Indie_Flower, Gaegu } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, SonnerProvider } from "@/components/providers";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NextTopLoader from "nextjs-toploader";

const breakfastNoodles = localFont({
  src: "/bn.woff2",
  variable: "--font-breakfast",
  weight: "200",
  style: "normal",
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-flower",
});

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tractor Auction",
  description: "Tractor Auction website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="apple-mobile-web-app-title" content="TractorAuction" />
        </head>
        <body
          className={`
          ${breakfastNoodles.variable}
          ${indieFlower.variable}
          ${gaegu.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          font-custom
        `}
        >
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader color="#ccc" showSpinner={false} />

              <SonnerProvider>
                <Navbar />
                <main className="overflow-x-hidden md:overflow-visible">
                  <div className="relative overflow-hidden">
                    <div
                      className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-[0.20]"
                      style={{
                        backgroundImage: "url('/bg-opaque.png')",
                        backgroundAttachment: "fixed",
                      }}
                    />
                  </div>
                </main>
                {children}
                <Footer />
              </SonnerProvider>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
