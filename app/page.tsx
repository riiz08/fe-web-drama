"use client";

import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import AdsterraPopUnder from "@/components/AdsterraPopUnder";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import AllDrama from "@/components/AllDrama";
import DramaLatestUpdate from "@/components/DramaLatestUpdate";
import Slider from "@/components/Slider";

const page = () => {
  return (
    <div>
      <AdsterraSocialBar />
      <Slider />
      <DramaLatestUpdate />
      <AllDrama />
      <AdsterraBanner728x90 />
    </div>
  );
};

export default page;
