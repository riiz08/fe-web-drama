import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { PlayCircle } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

type SliderCardProps = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  waktuSiaran: string;
};

const SliderCard = (drama: SliderCardProps) => {
  return (
    <Link href={`detail/${drama.slug}`}>
      <div className="relative group w-fit">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  as={NextImage}
                  alt="Dia Imamku"
                  className="object-cover"
                  shadow="md"
                  src={drama.thumbnail}
                  width={1200}
                  height={250}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-foreground/90">
                      {drama.waktuSiaran}
                    </h3>
                    <p className="text-small text-foreground/80 max-w-md">
                      {drama.description}
                    </p>
                    <h1 className="text-large font-medium mt-2">
                      {drama.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>

          {/* Play icon - muncul saat hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-50">
            <PlayCircle className="text-white w-10 h-10" />
          </div>
        </Card>
      </div>
    </Link>
  );
};

export default SliderCard;
