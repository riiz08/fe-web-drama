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
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    limit: 6, // default
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Atur limit sesuai device
      setPagination((prev) => ({
        ...prev,
        limit: mobile ? 6 : 14,
      }));
    }
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/dramas/latest-update?page=${pagination.page}&limit=${pagination.limit}`
      );
      const json = await res.json();

      if (json.success) {
        setDramas(json.data.episodes);
        setPagination(json.data.pagination);
      }
    };

    fetchData();
  }, [pagination.page, pagination.limit, isMobile]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  if (isMobile === null || dramas.length < 1) return <AnimateLoading />;

  return (
    <>
      <Heading text="Baru Saja Ditambahkan" />
      <DramaList dramas={dramas} />
      {pagination.totalPages > 1 && (
        <Pagination
          initialPage={pagination.page}
          total={pagination.totalPages}
          onChange={handlePageChange}
          className="my-4"
        />
      )}
    </>
  );
};

export default DramaLatestUpdate;
