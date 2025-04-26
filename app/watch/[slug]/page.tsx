"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AnimateLoading from "@/components/AnimateLoading";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import VideoPlayer from "@/components/VideoPlayer";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import NativeAdsterra from "@/components/AdsterraNative";
import AdsterraPopUnder from "@/components/AdsterraPopUnder";

interface Episode {
  id: string;
  slug: string;
  title: string;
  videoSrc: string;
  publishedAt: string;
}

export default function Watch() {
  const { slug } = useParams();
  const router = useRouter();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<Episode | null>(null);
  const [prevEpisode, setPrevEpisode] = useState<Episode | null>(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false); // State to track video play

  useEffect(() => {
    async function fetchEpisode() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/episode/${slug}`
      );
      const data = await res.json();

      setEpisode(data.episode);
      setNextEpisode(data.nextEpisode);
      setPrevEpisode(data.prevEpisode);
    }

    if (slug) fetchEpisode();
  }, [slug]);

  useEffect(() => {
    const hasWatchedBefore = localStorage.getItem("hasWatchedVideo");

    if (!hasWatchedBefore) {
      localStorage.setItem("hasWatchedVideo", "true");
    }
  }, []);

  if (!episode) return <AnimateLoading />;

  const handleVideoPlay = () => {
    setIsVideoPlayed(true); // Mark video as played
  };

  return (
    <div>
      <AdsterraSocialBar />
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
              <VideoPlayer
                src={episode.videoSrc}
                onPlay={handleVideoPlay} // Trigger video play event
              />
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

        <NativeAdsterra />
      </div>

      {/* PopUnder component will show only after video is played */}
      {isVideoPlayed && <AdsterraPopUnder onVideoPlayed={true} />}
    </div>
  );
}
