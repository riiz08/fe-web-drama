"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const toTitleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1),
    );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label: toTitleCase(decodeURIComponent(segment).replace(/-/g, " ")),
      href: "/" + segments.slice(0, index + 1).join("/"),
    })),
  ];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Breadcrumbs variant={"solid"}>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            <Link href={item.href}>{item.label}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
