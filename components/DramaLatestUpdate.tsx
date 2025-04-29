"use client";

import { useEffect, useState } from "react";
import Heading from "./Heading";
import DramaList from "./DramaList";
import AnimateLoading from "./AnimateLoading";
import { Pagination } from "@heroui/pagination";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
}

const DramaLatestUpdate = () => {
  const [dramas, setDramas] = useState([]);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [pagination, setPagination] = useState<PaginationProps | null>(null);

  useEffect(() => {
    // Jalankan hanya di client
    if (typeof window !== "undefined") {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    }
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/dramas/latest-update?limit=${isMobile ? 6 : 14}`
        );
        const json = await res.json();

        if (json.success) {
          setDramas(json.data.episodes);
          setPagination(json.data.pagination);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isMobile]);

  if (isMobile === null || dramas.length < 1) return <AnimateLoading />;

  return (
    <>
      <Heading text="Baru Saja Ditambahkan" />
      <DramaList dramas={dramas} />
      {pagination !== null ? (
        <Pagination
          initialPage={pagination.page}
          total={pagination.totalPages}
          className="my-4"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DramaLatestUpdate;
