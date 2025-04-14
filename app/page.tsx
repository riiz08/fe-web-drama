"use client";

import AnimateLoading from "@/components/AnimateLoading";
import DramaSection from "@/components/DramaSection";
import Heading from "@/components/Heading";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="md:py-10">
      <Heading title="Terbaru" />
      <Suspense fallback={<AnimateLoading />}>
        <DramaSection />
      </Suspense>
    </section>
  );
}
