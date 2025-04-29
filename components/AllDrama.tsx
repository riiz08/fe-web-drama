import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import AnimateLoading from "./AnimateLoading";
import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

interface Dramas {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

const AllDrama = () => {
  const [dramas, setDramas] = useState<Dramas[] | null>(null);

  const fetchingDrama = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/dramas`);
    const json = await res.json();

    if (json.success) {
      setDramas(json.data);
    }
  };

  useEffect(() => {
    try {
      fetchingDrama();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Heading text={"Drama"} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-7 md:gap-4 place-items-center my-4 bg-default-50 py-4 px-4 rounded-lg">
        {dramas !== null ? (
          dramas.map((drama) => (
            <a href={`/detail/${drama.slug}`} key={drama.slug}>
              <div className="relative group w-fit">
                <Card isFooterBlurred className="border-none" radius="lg">
                  <Image
                    alt={drama.title}
                    className="object-cover h-52 w-44"
                    height={200}
                    src={drama.thumbnail}
                    width={200}
                    priority
                  />

                  {/* Play icon - muncul saat hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <PlayCircle className="text-white w-10 h-10" />
                  </div>

                  <CardFooter className="justify-start font-semibold before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-primary-foreground">
                      {drama.title}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </a>
          ))
        ) : (
          <AnimateLoading />
        )}
      </div>
    </>
  );
};

export default AllDrama;
