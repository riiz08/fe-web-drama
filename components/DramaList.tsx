"use client";

import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import AnimateLoading from "./AnimateLoading";
import { DramaItem } from "@/types";

interface DramaListProps {
  dramas: DramaItem[];
}

const DramaList: React.FC<DramaListProps> = ({ dramas }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 place-items-center my-4 bg-default py-4 px-4 rounded-lg">
      {dramas.length > 0 ? (
        dramas.map((drama) => (
          <div key={drama.slug} className="mx-auto">
            <a href={`/watch/${drama.slug}`}>
              <Card isFooterBlurred className="border-none" radius="lg">
                <Image
                  alt={drama.title}
                  className="object-cover h-52 w-44"
                  height={200}
                  src={drama.thumbnail}
                  width={200}
                />
                <CardFooter className="justify-start font-semibold before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-primary-foreground">
                    {drama.title}
                  </p>
                </CardFooter>
              </Card>
            </a>
          </div>
        ))
      ) : (
        <AnimateLoading />
      )}
    </div>
  );
};

export default DramaList;
