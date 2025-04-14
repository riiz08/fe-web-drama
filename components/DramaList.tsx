import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import AnimateLoading from "./AnimateLoading";

interface Drama {
  title: string;
  slug: string;
  date: string | "";
  thumbnail: string;
}

interface DramaListProps {
  dramas: Drama[];
}

const DramaList: React.FC<DramaListProps> = ({ dramas }) => {
  return (
    <div
      className={`py-4 flex justify-center md:justify-start items-center gap-4 flex-wrap`}
    >
      {dramas.length > 0 ? (
        dramas.map((drama) => (
          <Link
            key={drama.title}
            className="cursor-pointer"
            href={`/watch/${drama.slug}`}
          >
            <Card className="py-4 w-80 md:max-w-[295px] max-h-52 group relative overflow-hidden">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{drama.title}</p>
                <small className="text-default-500">{drama.date}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="relative">
                  {/* Gambar */}
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full h-[130px] transition duration-300 group-hover:blur-sm"
                    height={130}
                    src={drama.thumbnail}
                    width={640}
                  />

                  {/* Icon Play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.752 11.168l-6.518-3.748A1 1 0 007 8.26v7.48a1 1 0 001.234.97l6.518-1.872A1 1 0 0016 13.94v-2.08a1 1 0 00-1.248-.692z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))
      ) : (
        <AnimateLoading />
      )}
    </div>
  );
};

export default DramaList;
