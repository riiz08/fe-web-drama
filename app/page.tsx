"use client";

import AdsterraAntiAdblock from "@/components/AdsterraAntiAdblock";
import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import AnimateLoading from "@/components/AnimateLoading";
import DramaSection from "@/components/DramaSection";
import Heading from "@/components/Heading";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="md:py-10">
      <AdsterraAntiAdblock />
      {/* Iklan Banner Adsterra */}
      <AdsterraBanner728x90 />
      <Heading title="Terbaru" />
      <Suspense fallback={<AnimateLoading />}>
        <DramaSection />
      </Suspense>
    </section>
  );
}
