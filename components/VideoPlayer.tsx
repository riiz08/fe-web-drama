"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  src: string;
};

const VideoPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        responsive: true,
        fluid: true,
      });
    }

    // HLS.js tetap digunakan untuk handle proxy
    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr, url) => {
          const proxiedSegmentUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/proxy?url=${encodeURIComponent(url)}`;
          xhr.open("GET", proxiedSegmentUrl, true);
        },
      });

      const masterPlaylistUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/proxy?url=${encodeURIComponent(src)}`;
      hls.loadSource(masterPlaylistUrl);
      hls.attachMedia(videoElement);

      return () => {
        hls.destroy();
        playerRef.current.dispose();
        playerRef.current = null;
      };
    } else {
      videoElement.src = src;
    }
  }, [src]);

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
