import { useEffect, useRef } from "react";

export function useAdsterra(videoId: string) {
  const hasInjectedInitial = useRef(false);
  const hasInjectedRepeat = useRef(false);

  const injectAds = () => {
    const now = Date.now();
    const last = parseInt(localStorage.getItem("ads_last_injected") || "0");
    const cooldown = 5 * 60 * 1000; // 5 menit

    if (now - last < cooldown) return;

    const social = document.createElement("script");
    social.src =
      "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js";
    social.async = true;
    document.body.appendChild(social);

    const pop = document.createElement("script");
    pop.src =
      "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
    pop.async = true;
    document.body.appendChild(pop);

    localStorage.setItem("ads_last_injected", now.toString());
  };

  useEffect(() => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (!video) return;

    const handlePlay = () => {
      if (!hasInjectedInitial.current) {
        hasInjectedInitial.current = true;
        injectAds();
      }

      // Monitor durasi tonton
      const interval = setInterval(() => {
        if (!hasInjectedRepeat.current && video.currentTime >= 300) {
          hasInjectedRepeat.current = true;
          injectAds();
        }
      }, 10000); // Cek tiap 10 detik

      video.addEventListener("pause", () => clearInterval(interval));
      video.addEventListener("ended", () => clearInterval(interval));
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, [videoId]);
}
