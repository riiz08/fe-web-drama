import { useEffect, useRef } from "react";

export default function NativeAdsterra(): JSX.Element {
  const containerId = "container-aebe990fb5438a745c69d6f8f1cb32a9";
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (adRef.current && !document.getElementById(containerId)) {
      const container = document.createElement("div");
      container.id = containerId;
      adRef.current.appendChild(container);

      const script = document.createElement("script");
      script.src =
        "//comelysouthbuilds.com/aebe990fb5438a745c69d6f8f1cb32a9/invoke.js";
      script.async = true;
      script.setAttribute("data-cfasync", "false");

      adRef.current.appendChild(script);
    }

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div ref={adRef} className="w-full flex justify-center items-center my-5" />
  );
}
