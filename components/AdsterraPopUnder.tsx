"use client";

import { useEffect } from "react";

export default function AdsterraPopUnder() {
  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = null;

    const loadScript = () => {
      if (scriptEl) {
        document.body.removeChild(scriptEl); // hapus script lama
      }

      scriptEl = document.createElement("script");
      scriptEl.type = "text/javascript";
      scriptEl.src =
        "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
      scriptEl.async = true;
      document.body.appendChild(scriptEl);
    };

    loadScript(); // pertama kali load
    const intervalId = setInterval(loadScript, 10 * 60 * 1000); // setiap 5 menit

    return () => {
      clearInterval(intervalId);
      if (scriptEl) {
        document.body.removeChild(scriptEl);
      }
    };
  }, []);

  return null;
}
