"use client";

import { useEffect, useRef } from "react";
export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    key: "d239af39967817bd6250bf88ab82e50e",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <div
      className="mx-2 my-5 justify-center items-center text-white text-center"
      ref={banner}
    ></div>
  );
}
