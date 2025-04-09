import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";

export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/drama-terbaru`
  );
  const dramas = await data.json();

  return (
    <section className="py-8 md:py-10">
      <h2 className="font-semibold text-2xl">Terbaru</h2>
      <div className="py-5 flex justify-center items-center gap-4 flex-wrap">
        {dramas.data
          ? dramas.data.map((drama: any) => (
              <Card className="py-4 max-w-72" key={drama.title}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{drama.title}</p>
                  <small className="text-default-500">{drama.date}</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={drama.thumb}
                    width={270}
                    height={130}
                  />
                </CardBody>
              </Card>
            ))
          : "Data tidak ditemukan!!"}
      </div>
    </section>
  );
}
