"use client";

import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import AnimateLoading from "@/components/AnimateLoading";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

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

const DramaDetail: React.FC = () => {
  const { slug } = useParams();
  const [drama, setDrama] = useState<Drama | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrama = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/drama/${slug}`
        );
        const result = await res.json();
        setDrama(result.data.drama);
        setEpisodes(result.data.episodes);
      } catch (err) {
        console.error("Error fetching drama:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrama();
  }, [slug]);

  if (loading) return <AnimateLoading />;
  if (!drama) return <div className="p-4">Drama not found.</div>;
  if (!episodes) return <div className="p-4">Episodes not found.</div>;

  return (
    <>
      <AdsterraSocialBar />
      <div className="min-h-screen px-4 md:px-12 py-8 rounded-md bg-default-50">
        <div className="flex flex-col lg:flex-row gap-6">
          <Image
            src={drama.thumbnail}
            alt={drama.title}
            className="w-full lg:w-1/3 object-cover rounded-2xl shadow"
            height={500}
            width={1200}
            priority
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
                        <Button variant="shadow" color="primary">
                          <a href={`/watch/${ep.slug}`}>Watch</a>
                        </Button>
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

export default DramaDetail;
