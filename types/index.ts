import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DramaItem = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tarikhTayangan: string;
  waktuSiaran: string;
  rangkaian: string;
  pengarah: string;
  produksi: string;
};

export type DramaApiResponse = {
  success: boolean;
  data: DramaItem[];
};
