"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "./icons";
import { useRef } from "react";
import { Button } from "@heroui/button";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleValue = () => {
    const value = searchRef.current?.value.trim();
    if (!value) {
      console.log("Input kosong, tidak melakukan aksi.");
      return;
    }
    alert(searchRef.current?.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = searchRef.current?.value.trim();
      if (!value) {
        // Kosong atau hanya spasi
        console.log("Input kosong, tidak melakukan aksi.");
        return;
      }
      alert(`Kamu menekan Enter! Isi input: ${value}`);
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
