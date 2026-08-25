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
  metadataBase: new URL("https://www.mebpbooks.com"),

  title: {
    default:
      "Model Educational Book Publishers | Quality Educational Books in Nigeria",
    template: "%s | MEBP",
  },

  description:
    "Model Educational Book Publishers Limited provides quality, accessible and affordable educational books for nursery and primary school learners in Nigeria.",

  keywords: [
    "MEBP",
    "Model Educational Book Publishers",
    "Educational Books Nigeria",
    "Educational Publishers Nigeria",
    "Primary School Books Nigeria",
    "Nursery School Books Nigeria",
    "Primary School Textbooks",
    "Mathematics Books for Primary Schools",
    "English Books for Primary Schools",
    "Handwriting Books for Children",
    "Verbal Reasoning Books",
    "Quantitative Reasoning Books",
    "Educational Storybooks",
    "Learning Materials for Children",
  ],

  authors: [
    {
      name: "Model Educational Book Publishers Limited",
    },
  ],

  creator: "Model Educational Book Publishers Limited",

  publisher: "Model Educational Book Publishers Limited",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.mebpbooks.com",
    siteName: "Model Educational Book Publishers",
    title:
      "Model Educational Book Publishers | Quality Educational Books in Nigeria",
    description:
      "Discover quality and affordable educational books for nursery and primary school learners in Nigeria.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Model Educational Book Publishers | Quality Educational Books in Nigeria",
    description:
      "Discover quality and affordable educational books for nursery and primary school learners in Nigeria.",
  },
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