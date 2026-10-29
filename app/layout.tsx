import type { Metadata } from "next";
import "./globals.css";
import { sans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "CR&L @ Cornell | Consumer, Retail & Luxury Club",
  description:
    "A student-led club for Cornell Executive MBA students building careers across luxury, beauty, consumer goods, and specialty retail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.className} bg-[#F7F3EA] text-[#0B0B0B] antialiased`}>{children}</body>
    </html>
  );
}
