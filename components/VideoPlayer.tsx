import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  src: string;
};

const VideoPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to handle fullscreen change
  const handleFullscreenChange = () => {
    if (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || typeof window === "undefined") return;

    // Event listener to detect fullscreen change
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

      // Remove event listeners when component is unmounted
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [src]);

  // Handle orientation change during fullscreen, but only on mobile
  useEffect(() => {
    // Check if the device is mobile (e.g., screen width is less than 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile && isFullscreen && screen.orientation) {
      // Lock orientation to portrait if fullscreen on mobile
      if (screen.orientation && typeof screen.orientation.lock === "function") {
        (screen.orientation as any)
          .lock("portrait")
          .catch((err: any) => console.error(err));
      }
    } else {
      // Unlock orientation when fullscreen is off or not on mobile
      if (screen.orientation) {
        screen.orientation.unlock();
      }
    }
  }, [isFullscreen]);

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
