"use client";

import AnimateLoading from "@/components/AnimateLoading";
import SearchSection from "@/components/SearchSection";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<AnimateLoading />}>
      <SearchSection />
    </Suspense>
  );
};

export default Page;
