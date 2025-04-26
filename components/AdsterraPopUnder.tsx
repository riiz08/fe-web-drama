// components/PopUnder.tsx

import { useEffect } from "react";

interface PopUnderProps {
  onVideoPlayed: boolean;
}

const AdsterraPopUnder: React.FC<PopUnderProps> = ({ onVideoPlayed }) => {
  useEffect(() => {
    if (onVideoPlayed) {
      const script = document.createElement("script");
      script.src =
        "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
      script.async = true;
      document.body.appendChild(script);

      // Clean up script when component unmounts
      return () => {
        const existingScript = document.querySelector(
          'script[src="//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js"]'
        );
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [onVideoPlayed]);

  return null;
};

export default AdsterraPopUnder;
