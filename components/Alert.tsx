"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useState } from "react";

export default function MyAlert() {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 5000);

  return (
    <div className="mr-5 fixed bottom-16 z-[9999] mx-auto transition-all duration-300">
      {isVisible ? (
        <Alert
          color="primary"
          description="Klik join yang mau masuk channel ya!"
          endContent={
            <Link href={"https://t.me/+pBH5WCVyC0wxNWRl"}>
              <Button color="secondary" size="sm" variant="shadow">
                Join
              </Button>
            </Link>
          }
          title="Info channel tele"
          variant="solid"
        />
      ) : (
        ""
      )}
    </div>
  );
}
