import { TrendingItem } from "@/types";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { useRouter } from "next/navigation";
import React from "react";

type ListTrendingProps = {
  trending: TrendingItem[];
};

const ListTrending: React.FC<ListTrendingProps> = ({ trending }) => {
  const router = useRouter();
  return (
    <>
      {trending.map((trend) => (
        <Listbox
          key={trend.slug}
          aria-label="Actions"
          onAction={() => {
            router.push(`/${trend.slug}}`);
          }}
        >
          <ListboxItem key={trend.slug}>{trend.title}</ListboxItem>
        </Listbox>
      ))}
    </>
  );
};

export default ListTrending;
