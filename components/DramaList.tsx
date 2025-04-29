"use client";

import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import AnimateLoading from "./AnimateLoading";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

interface DramaProps {
  slug: string;
  title: string;
  episodeNum: string;
  publishedAt: string;
  videoSrc: string;
  drama: {
    title: string;
    slug: string;
    thumbnail: string;
  };
}

interface DramaListProps {
  dramas: DramaProps[];
}

const DramaList: React.FC<DramaListProps> = ({ dramas }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-7 md:gap-4 place-items-center my-4 bg-default-50 py-4 px-4 rounded-lg">
      {dramas.length > 0 ? (
        dramas.map((drama) => (
          <Link prefetch={false} href={`/watch/${drama.slug}`} key={drama.slug}>
            <div className="relative group w-fit">
              <Card isFooterBlurred className="border-none" radius="lg">
                <Image
                  alt={drama.title}
                  className="object-cover h-52 w-44"
                  height={200}
                  src={drama.drama.thumbnail}
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
          </Link>
        ))
      ) : (
        <AnimateLoading />
      )}
    </div>
  );
};

export default DramaList;
