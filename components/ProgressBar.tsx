"use client";

import { Progress } from "@heroui/progress";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loading when path changes
    setLoading(true);

    // Stop loading after short delay (simulasi waktu load)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400); // kamu bisa atur waktunya lebih panjang jika perlu

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
        size="sm"
      />
    </div>
  ) : null;
}
