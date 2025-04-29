"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnimateLoading from "@/components/AnimateLoading";

export default function LoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // adjust based on animation
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <AnimateLoading /> : null;
}
