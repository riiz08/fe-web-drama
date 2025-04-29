// hooks/useEpisode.ts
import { useState, useEffect } from "react";

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
}

export function useEpisode(slug: string | undefined) {
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

    if (slug) {
      fetchEpisode();
    }
  }, [slug]);

  return { episode, nextEpisode, prevEpisode, drama };
}
