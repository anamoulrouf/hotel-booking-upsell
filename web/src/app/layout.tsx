import type { Metadata } from "next";
import { Stack_Sans_Headline, Stack_Sans_Notch, Stack_Sans_Text } from "next/font/google";
import "./globals.css";

// Stack Sans trio — docs/10-DESIGN.md §3. next/font self-hosts them (no
// third-party request, no layout shift); CSS vars feed the stacks in globals.css.
const stackNotch = Stack_Sans_Notch({
  subsets: ["latin"],
  variable: "--ff-notch",
  display: "swap",
});
const stackHeadline = Stack_Sans_Headline({
  subsets: ["latin"],
  variable: "--ff-headline",
  display: "swap",
});
const stackText = Stack_Sans_Text({
  subsets: ["latin"],
  variable: "--ff-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Booking Upsell Report — find the pre-arrival revenue you're missing",
    template: "%s · Booking Upsell Report",
  },
  description:
    "Enter your hotel's website and get a free upsell report: score, missed revenue estimate, sample guest pages and package ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${stackNotch.variable} ${stackHeadline.variable} ${stackText.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
