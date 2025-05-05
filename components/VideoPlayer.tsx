import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useAdsterra } from "@/hooks/useAdsterra";

type Props = {
  src: string;
};

const VideoPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useAdsterra("video-player"); // <- INJEKSI IKLAN

  const handleFullscreenChange = () => {
    const fullscreenElement =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    setIsFullscreen(!!fullscreenElement);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || typeof window === "undefined") return;

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

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
    };

    const raf = requestAnimationFrame(() => {
      initializePlayer();
    });

    return () => {
      cancelAnimationFrame(raf);
      hlsRef.current?.destroy();
      hlsRef.current = null;

      playerRef.current?.dispose();
      playerRef.current = null;

      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [src]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && isFullscreen && screen.orientation?.lock) {
      screen.orientation.lock("landscape").catch((err) => {});
    } else {
      screen.orientation?.unlock?.();
    }
  }, [isFullscreen]);

  return (
    <div data-vjs-player className="flex justify-center">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered w-full max-w-3xl rounded-lg"
        id="video-player"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
