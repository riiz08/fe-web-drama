"use client";

import React, { useEffect, useState } from "react";
import AnimateLoading from "./AnimateLoading";
import AdsterraSocialBar from "./AdsterraSocialBar";
import Image from "next/image";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";
import LoadingIndicator from "@/app/loading-indicator";

interface Episode {
  title: string;
  slug: string;
  episodeNumber: number;
}

interface Drama {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

interface DetailDramaProps {
  slug: string | string[] | undefined;
}

const DetailDrama: React.FC<DetailDramaProps> = ({ slug }) => {
  const [drama, setDrama] = useState<Drama | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);

  useEffect(() => {
    const fetchDrama = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/drama/${slug}`
      );
      const result = await res.json();
      setDrama(result.data.drama);
      setEpisodes(result.data.episodes);
    };

    fetchDrama();
  }, [slug]);

  if (!drama) return <AnimateLoading />;
  if (!episodes) return <AnimateLoading />;
  return (
    <>
      <AdsterraSocialBar />
      <div className="min-h-screen my-4 px-4 md:px-12 py-8 rounded-md bg-default-50">
        <div className="flex flex-col lg:flex-row gap-6">
          <Image
            src={drama.thumbnail}
            alt={drama.title}
            className="w-full lg:w-1/3 object-cover rounded-2xl shadow"
            height={500}
            loading="lazy"
            width={1200}
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {drama.title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              {drama.description}
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {episodes.map((ep) => (
                  <Card key={ep.slug} className="hover:shadow-lg">
                    <CardBody className="p-4">
                      <div className="flex flex-col gap-2">
                        <span className="font-medium text-lg">
                          Episode {ep.episodeNumber}: {ep.title}
                        </span>
                        <Link href={`/watch/${ep.slug}`}>
                          <LoadingIndicator />
                          <Button variant="shadow" color="primary" size="md">
                            Watch
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailDrama;
