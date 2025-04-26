"use client";

import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import DramaLatestUpdate from "@/components/DramaLatestUpdate";
import Slider from "@/components/Slider";

const page = () => {
  return (
    <div>
      <AdsterraSocialBar />
      <Slider />
      <DramaLatestUpdate />
      <AdsterraBanner728x90 />
    </div>
  );
};

export default page;
