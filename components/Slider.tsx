"use client";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SliderCard from "./SliderCard";
import { Suspense, useEffect, useState } from "react";
import { DramaItem } from "@/types";
import AnimateLoading from "./AnimateLoading";

const Slider = () => {
  const [dramas, setDramas] = useState<DramaItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/dramas`
      );
      const result = await response.json();

      setDramas(result.data);
    } catch (error) {
      console.log({ message: error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dramas.length === 0) return <AnimateLoading />;

  return (
    <div className=" md:block hidden">
      <Suspense>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Autoplay, Navigation, Pagination]}
          className="mySwipe"
        >
          {dramas.length > 0
            ? dramas.map((drama) => (
                <SwiperSlide key={drama.slug}>
                  <SliderCard
                    title={drama.title}
                    description={drama.description}
                    slug={drama.slug}
                    thumbnail={drama.thumbnail}
                    waktuSiaran={drama.waktuSiaran}
                  />
                </SwiperSlide>
              ))
            : "Something when wrong"}
        </Swiper>
      </Suspense>
    </div>
  );
};

export default Slider;
