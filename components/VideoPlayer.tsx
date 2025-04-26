// components/VideoPlayer.tsx
"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  src: string;
  onPlay?: () => void; // Menambahkan properti onPlay
};

const VideoPlayer = ({ src, onPlay }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || typeof window === "undefined") return;

    // pastikan dijalankan saat DOM benar-benar siap
    const initializePlayer = () => {
      if (!playerRef.current) {
        playerRef.current = videojs(videoElement, {
          controls: true,
          responsive: true,
          fluid: true,
        });
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            const proxyUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/proxy?url=${encodeURIComponent(url)}`;
            xhr.open("GET", proxyUrl, true);
          },
        });

        hlsRef.current = hls;

        const playlistUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/proxy?url=${encodeURIComponent(src)}`;
        hls.loadSource(playlistUrl);
        hls.attachMedia(videoElement);
      } else {
        videoElement.src = src;
      }

      // Menambahkan event listener untuk memanggil onPlay saat video mulai diputar
      videoElement.addEventListener("play", () => {
        if (onPlay) onPlay(); // Memanggil fungsi onPlay ketika video diputar
      });
    };

    // Gunakan requestAnimationFrame untuk delay sampai DOM ready
    const raf = requestAnimationFrame(() => {
      initializePlayer();
    });

    return () => {
      cancelAnimationFrame(raf);
      hlsRef.current?.destroy();
      hlsRef.current = null;

      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [src, onPlay]);

  return (
    <div data-vjs-player className="flex justify-center">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered w-full max-w-3xl rounded-lg"
      />
    </div>
  );
};

export default VideoPlayer;
