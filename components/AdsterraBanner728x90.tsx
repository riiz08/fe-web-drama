"use client";

import { useEffect, useRef } from "react";

const AdsterraBanner728x90 = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : 'd239af39967817bd6250bf88ab82e50e',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "//comelysouthbuilds.com/d239af39967817bd6250bf88ab82e50e/invoke.js";
    script2.type = "text/javascript";
    script2.async = true;

    if (adRef.current) {
      adRef.current.appendChild(script1);
      adRef.current.appendChild(script2);
    }

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={adRef} className="my-4 flex justify-center" />;
};

export default AdsterraBanner728x90;
