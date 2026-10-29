import { Inter, Playfair_Display } from "next/font/google";

// Swap Playfair Display for Canela if the club licenses it.
export const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
