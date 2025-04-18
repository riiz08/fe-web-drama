import { Suspense, useEffect, useState } from "react";
import Heading from "./Heading";
import DramaList from "./DramaList";
import AnimateLoading from "./AnimateLoading";
import { DramaApiResponse, DramaItem } from "@/types";

const Komedi = () => {
  const [dramas, setDramas] = useState<DramaItem[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/Komedi`);
      const json: DramaApiResponse = await res.json();

      if (json.success) {
        setDramas(json.data.drama);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Suspense fallback={<AnimateLoading />}>
        <Heading title="Komedi" />
        <DramaList dramas={dramas} />
      </Suspense>
    </>
  );
};

export default Komedi;
