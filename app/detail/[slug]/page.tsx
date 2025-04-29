"use client";

import DetailDrama from "@/components/DetailDrama";
import { useParams } from "next/navigation";

const DramaDetailPage = () => {
  const { slug } = useParams();

  return <DetailDrama slug={slug} />;
};

export default DramaDetailPage;
