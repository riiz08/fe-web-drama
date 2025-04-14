"use client";

import React, { Suspense } from "react";
import AnimateLoading from "./AnimateLoading";

interface FilemoonPlayerProps {
  src: string;
  title: string;
}

const FilemoonPlayer: React.FC<FilemoonPlayerProps> = ({ src, title }) => {
  return (
    <div className="aspect-video w-full md:w-10/12">
      <Suspense fallback={<AnimateLoading />}>
        <iframe
          src={src}
          allowFullScreen
          className="w-full h-full rounded-md"
          frameBorder="0"
          title={title}
        ></iframe>
      </Suspense>
    </div>
  );
};

export default FilemoonPlayer;
