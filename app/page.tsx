"use client";

import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import AnimateLoading from "@/components/AnimateLoading";
import DramaSection from "@/components/DramaSection";
import Script from "next/script";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="md:py-10">
      <Script
        type="text/javascript"
        src="//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js"
        strategy="afterInteractive"
      />
      {/* Iklan Banner Adsterra */}
      <AdsterraBanner728x90 />
      <Suspense fallback={<AnimateLoading />}>
        <DramaSection />
      </Suspense>
    </section>
  );
}
