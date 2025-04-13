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
  relatedPost: boolean;
}

const DramaList: React.FC<DramaListProps> = ({ dramas, relatedPost }) => {
  return (
    <div
      className={`py-4 flex ${relatedPost ? "justify-start ml-2" : "justify-center"} items-center gap-4 flex-wrap`}
    >
      {dramas.length > 0 ? (
        dramas.map((drama) => (
          <Link
            key={drama.title}
            className="cursor-pointer"
            href={`/watch/${drama.slug}`}
          >
            <Card className="py-4 max-w-[295px] max-h-52">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{drama.title}</p>
                <small className="text-default-500">{drama.date}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  height={130}
                  src={drama.thumbnail}
                  width={640}
                />
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
