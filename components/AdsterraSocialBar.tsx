// components/SocialBar.tsx
import React, { useEffect } from "react";

const AdsterraSocialBar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div className="social-bar">{/* You can style this container */}</div>;
};

export default AdsterraSocialBar;
