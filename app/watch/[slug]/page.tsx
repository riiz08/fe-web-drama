import Breadcrumb from "@/components/Breadcrumb";
import DramaList from "@/components/DramaList";
import FilemoonPlayer from "@/components/VideoPlayer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/watch/${slug}`,
  );
  const rawData = await data.json();
  const drama = rawData.data;

  return (
    <section>
      <Breadcrumb />
      <div>
        <h1 className="text-2xl font-bold ml-2 my-2">{drama.episodeTitle}</h1>
        <div className="p-4 w-10/12">
          <FilemoonPlayer src={drama.video} title={drama.episodeTitle} />
        </div>
      </div>
      <div>
        <h2 className="ml-2 font-semibold text-2xl">Related Post</h2>
        <DramaList dramas={drama.relatedEpisodes} relatedPost />
      </div>
    </section>
  );
}
