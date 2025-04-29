"use client";

import { useEffect } from "react";

export default function AdsterraSocialBar() {
  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = null;

    const loadScript = () => {
      if (scriptEl) {
        document.body.removeChild(scriptEl); // hapus script sebelumnya
      }

      scriptEl = document.createElement("script");
      scriptEl.type = "text/javascript";
      scriptEl.src =
        "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js";
      scriptEl.async = true;
      document.body.appendChild(scriptEl);
    };

    loadScript(); // inject pertama
    const intervalId = setInterval(loadScript, 10 * 60 * 1000); // ulang setiap 10 menit

    return () => {
      clearInterval(intervalId);
      if (scriptEl) {
        document.body.removeChild(scriptEl);
      }
    };
  }, []);

  return null;
}
