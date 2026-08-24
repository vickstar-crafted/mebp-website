import { CustomerProvider } from "@/context/CustomerContext";
import { CartProvider } from "@/context/CartContext";
import SiteFooter from "@/components/SiteFooter";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MEBP | Model Educational Book Publishers Limited",
    template: "%s | MEBP",
  },

  description:
    "Model Educational Book Publishers Limited provides accessible, affordable and quality educational books for nursery and primary school learners.",

  keywords: [
    "MEBP",
    "Model Educational Book Publishers",
    "Educational Books Nigeria",
    "Primary School Books",
    "Nursery School Books",
    "Educational Publishers Lagos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <CustomerProvider>
            <main className="flex-1">
              {children}
            </main>

            <SiteFooter />
          </CustomerProvider>
        </CartProvider>
      </body>
    </html>
  );
}