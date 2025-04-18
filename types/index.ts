import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DramaItem = {
  title: string;
  thumbnail: string;
  slug: string;
  dateTime: string | null;
};

export type TrendingItem = {
  title: string;
  slug: string;
};

export type DramaApiResponse = {
  success: boolean;
  data: {
    currentPage: number;
    totalPage: number;
    drama: DramaItem[];
  };
  trending: TrendingItem[];
};
