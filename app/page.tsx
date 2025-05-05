"use client";

import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import MyAlert from "@/components/Alert";
import AllDrama from "@/components/AllDrama";
import DramaLatestUpdate from "@/components/DramaLatestUpdate";
import Slider from "@/components/Slider";

const page = () => {
  return (
    <div>
      <MyAlert />
      <AdsterraSocialBar />
      <Slider />
      <DramaLatestUpdate />
      <AllDrama />
      <AdsterraBanner728x90 />
    </div>
  );
};

export default page;
