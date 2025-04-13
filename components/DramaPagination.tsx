"use client";

import { Pagination } from "@heroui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AnimateLoading from "./AnimateLoading";

interface ApiResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  data: any[];
}

export default function DramaPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/v1/latest-update?page=${currentPage}`
      );
      const json: ApiResponse = await res.json();

      if (json.success) {
        setTotalPages(json.totalPages);
        // kamu bisa set data di state juga kalau mau tampilkan listnya
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`); // update URL
  };

  return (
    <div className="flex justify-center mt-10">
      <Suspense fallback={<AnimateLoading />}>
        <Pagination
          boundaries={1}
          color="secondary"
          page={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </Suspense>
    </div>
  );
}
