"use client";

import { Suspense, useEffect, useState } from "react"; // Eksternal pertama
import { useSearchParams, useRouter } from "next/navigation"; // Eksternal kedua
import { Pagination } from "@heroui/pagination"; // Eksternal - pastikan setelah external modules
import DramaList from "./DramaList"; // Impor lokal
import AnimateLoading from "./AnimateLoading";

interface Drama {
  title: string;
  slug: string;
  date: string | "";
  thumbnail: string;
}

interface ApiResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  data: Drama[];
}

const DramaSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const page = Number(searchParams.get("page")) || 1;

  const fetchData = async (page: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/latest-update?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json: ApiResponse = await res.json();

      if (json.success) {
        setDramas(json.data);
        setTotalPages(json.totalPages);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (p: number) => {
    router.push(`?page=${p}`);
  };

  return (
    <Suspense fallback={<AnimateLoading />}>
      <DramaList dramas={dramas} relatedPost={false} />
      <div className="flex justify-center mt-10">
        <Pagination
          boundaries={1}
          color="secondary"
          page={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </Suspense>
  );
};

export default DramaSection;
