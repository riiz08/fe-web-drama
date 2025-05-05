"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "./icons";
import { useRef } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleValue = () => {
    const value = searchRef.current?.value.trim();
    if (!value) {
      return;
    } else {
      const encoded = value.replace(/ /g, "+");
      return router.push(`/search?q=${encoded}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = searchRef.current?.value.trim();
      if (!value) {
        // Kosong atau hanya spasi
        return;
      } else {
        const encoded = value.replace(/ /g, "+");
        return router.push(`/search?q=${encoded}`);
      }
    }
  };

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Button variant="light" onPress={handleValue}>
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        </Button>
      }
      labelPlacement="outside"
      placeholder="Search..."
      ref={searchRef}
      type="search"
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
