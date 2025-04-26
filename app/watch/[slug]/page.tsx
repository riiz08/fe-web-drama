"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AnimateLoading from "@/components/AnimateLoading";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import VideoPlayer from "@/components/VideoPlayer";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import AdsterraPopUnder from "@/components/AdsterraPopUnder";
import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import DramaCard from "@/components/DramaDetailCard";

interface Episode {
  id: string;
  slug: string;
  title: string;
  videoSrc: string;
  publishedAt: string;
}

interface Drama {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tarikhTayangan: string;
  waktuSiaran: string;
  rangkaian: string;
  pengarah: string;
  produksi: string;
}

export default function Watch() {
  const { slug } = useParams();
  const router = useRouter();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<Episode | null>(null);
  const [prevEpisode, setPrevEpisode] = useState<Episode | null>(null);
  const [drama, setDrama] = useState<Drama | null>(null);

  useEffect(() => {
    async function fetchEpisode() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/episode/${slug}`
      );
      const data = await res.json();

      setEpisode(data.episode);
      setNextEpisode(data.nextEpisode);
      setPrevEpisode(data.prevEpisode);
      setDrama(data.drama);
    }

    if (slug) fetchEpisode();
  }, [slug]);

  if (!episode) return <AnimateLoading />;
  if (!drama) return <AnimateLoading />;

  return (
    <div>
      <AdsterraSocialBar />
      <AdsterraPopUnder />
      <div className="p-4 max-w-5xl min-h-screen mx-auto">
        <Button
          variant="ghost"
          color="primary"
          onPress={() => window.history.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>

        <Card className="mb-4">
          <CardBody className="p-2 md:p-4">
            <div className="aspect-video w-full">
              <VideoPlayer src={episode.videoSrc} />
            </div>
          </CardBody>
        </Card>

        <h1 className="text-xl font-bold mb-2">{episode.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Dipublikasikan: {new Date(episode.publishedAt).toLocaleDateString()}
        </p>

        <div className="flex justify-between items-center">
          <Button
            variant="shadow"
            color="primary"
            size="sm"
            isDisabled={!prevEpisode}
            onPress={() =>
              prevEpisode && router.push(`/watch/${prevEpisode.slug}`)
            }
          >
            <ArrowLeft className="h-4 w-4" />
            Prev
          </Button>

          <Button
            variant="shadow"
            color="primary"
            size="sm"
            isDisabled={!nextEpisode}
            onPress={() =>
              nextEpisode && router.push(`/watch/${nextEpisode.slug}`)
            }
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <DramaCard drama={drama} />
        <AdsterraBanner728x90 />
        <AdsterraSocialBar />
      </div>
    </div>
  );
}
