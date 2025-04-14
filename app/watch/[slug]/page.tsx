import Breadcrumb from "@/components/Breadcrumb";
import DramaList from "@/components/DramaList";
import Heading from "@/components/Heading";
import RecentPost from "@/components/RecentPost";
import FilemoonPlayer from "@/components/VideoPlayer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/watch/${slug}`
  );
  const rawData = await data.json();
  const drama = rawData.data;
  const recent = rawData.recentPosts;
  const related = rawData.relatedEpisodes;

  return (
    <section>
      <Breadcrumb />
      <div>
        <h1 className="text-xl md:text-2xl font-bold ml-2 my-2">
          {drama.episodeTitle}
        </h1>
        <div className="p-4 w-full justify-center items-center flex">
          <FilemoonPlayer src={drama.video} title={drama.episodeTitle} />
        </div>
      </div>
      <div>
        <Heading title="Related Post" />
        <DramaList dramas={related} />
        <Heading title="Recent Post" />
        <RecentPost recentPost={recent} />
      </div>
    </section>
  );
}
