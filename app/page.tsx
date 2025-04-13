"use client";

import AnimateLoading from "@/components/AnimateLoading";
import DramaSection from "@/components/DramaSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="py-8 md:py-10">
      <h2 className="font-semibold text-2xl">Terbaru</h2>
      <Suspense fallback={<AnimateLoading />}>
        <DramaSection />
      </Suspense>
    </section>
  );
}
