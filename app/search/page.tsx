"use client";

import DramaList from "@/components/DramaList";
import Heading from "@/components/Heading";
import RecentPost from "@/components/RecentPost";
import { Pagination } from "@heroui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [dramas, setDramas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [recent, setRecent] = useState([]);
  const page = Number(searchParams.get("page")) || 1;
  const router = useRouter();

  const fetchData = async (page: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/v1/?page=${page}&search=${query}`
      );
      const json = await res.json();
      if (json.success) {
        setDramas(json.data);
        setTotalPages(json.totalPages);
        setRecent(json.recentPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (p: number) => {
    router.push(`?page=${p}`);
  };

  return (
    <section>
      <Heading title={query} />
      <DramaList dramas={dramas} />
      <div className="flex justify-center my-5">
        <Pagination
          boundaries={1}
          color="secondary"
          page={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
      <Heading title="Recent Post" />
      <RecentPost recentPost={recent} />
    </section>
  );
};

export default Page;
