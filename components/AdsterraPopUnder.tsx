import { useEffect, useRef } from "react";

const AdsterraPopUnder = () => {
  const triggeredRef = useRef(false);

  useEffect(() => {
    const handleClick = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;

      const script = document.createElement("script");
      script.src =
        "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
      script.async = true;
      document.body.appendChild(script);

      document.removeEventListener("click", handleClick);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};

export default AdsterraPopUnder;
