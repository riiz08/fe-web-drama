"use client";

import { Progress } from "@heroui/progress";
import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
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
