// app/components/AdsterraNative.tsx
"use client";

import { useEffect } from "react";

const AdsterraNative = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//comelysouthbuilds.com/aebe990fb5438a745c69d6f8f1cb32a9/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="container-aebe990fb5438a745c69d6f8f1cb32a9"
      style={{ width: "100%", textAlign: "center", margin: "20px 0" }}
    />
  );
};

export default AdsterraNative;
