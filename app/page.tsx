"use client";

import AnimateLoading from "@/components/AnimateLoading";
import Banner from "@/components/Banner";
import DramaSection from "@/components/DramaSection";
import Heading from "@/components/Heading";
import Head from "next/head";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="md:py-10">
      <Head>
        <script
          type="text/javascript"
          src="//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js"
        ></script>
      </Head>
      {/* Iklan Banner Adsterra */}
      <Banner />
      <Heading title="Terbaru" />
      <Suspense fallback={<AnimateLoading />}>
        <DramaSection />
      </Suspense>
    </section>
  );
}
