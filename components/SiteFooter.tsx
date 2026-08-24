"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function SiteFooter() {
  const pathname = usePathname();

  // Do not show the public website footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}