// app/components/AdsterraAntiAdblock.tsx
"use client";

import { useEffect } from "react";

const AdsterraAntiAdblock = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return null; // Script akan otomatis menambah elemen iklan
};

export default AdsterraAntiAdblock;
