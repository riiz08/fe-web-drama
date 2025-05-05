"use client";

import AnimateLoading from "@/components/AnimateLoading";
import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <>
      <Suspense fallback={<AnimateLoading />}>
        <SearchClient />
      </Suspense>
    </>
  );
};

export default SearchPage;
