import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DramaItem } from "@/types";
import { Card, CardFooter } from "@heroui/card";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Heading from "@/components/Heading";
import AnimateLoading from "@/components/AnimateLoading";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [dramas, setDramas] = useState<DramaItem[]>([]);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/search?q=${query}`
      );
      const result = await response.json();
      setDramas(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
      <AdsterraSocialBar />
      <Heading text={query} />
      <div className="flex justify-start mt-4 min-h-screen items-start flex-wrap">
        {dramas.length != 0 ? (
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
}
