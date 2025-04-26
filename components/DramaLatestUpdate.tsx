"use client";

import { useEffect, useState } from "react";
import Heading from "./Heading";
import DramaList from "./DramaList";
import AnimateLoading from "./AnimateLoading";

const DramaLatestUpdate = () => {
  const [dramas, setDramas] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/dramas/latest-update`
      );
      const json = await res.json();

      if (json.success) {
        setDramas(json.data.episodes);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dramas.length < 1) return <AnimateLoading />;

  return (
    <>
      <Heading text="Baru Saja Ditambahkan" />
      <DramaList dramas={dramas} />
    </>
  );
};

export default DramaLatestUpdate;
