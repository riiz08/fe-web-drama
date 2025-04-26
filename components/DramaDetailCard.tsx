// components/DramaCard.tsx

import Link from "next/link";
import Image from "next/image";

type Drama = {
  id: string;
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

const DramaCard = ({ drama }: { drama: Drama }) => {
  return (
    <Link
      href={`/detail/${drama.slug}`}
      className="block mt-4 rounded-2xl overflow-hidden border shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative w-full aspect-video">
        <Image
          src={drama.thumbnail}
          alt={drama.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2">{drama.title}</h3>
        <p className="text-sm line-clamp-3">{drama.description}</p>

        <div className="text-xs mt-2 space-y-1">
          <p>
            <span className="font-medium">Tayangan:</span>{" "}
            {drama.tarikhTayangan}
          </p>
          <p>
            <span className="font-medium">Siaran:</span> {drama.waktuSiaran}
          </p>
          <p>
            <span className="font-medium">Rangkaian:</span> {drama.rangkaian}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DramaCard;
