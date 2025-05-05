// app/watch/[slug]/page.tsx

import WatchClient from "@/components/WatchClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.API_URL}/api/v1/episode/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Episode not found");

  const data = await res.json();
  const episode = data.episode;

  return {
    title: episode.title,
    description:
      episode.description ||
      "Tonton semua drama Melayu terkini secara percuma dan cepat.",
    openGraph: {
      title: episode.title,
      description: episode.description,
      url: `https://mangeakkk.my.id/watch/${slug}`,
      siteName: "MangEakkk",
      images: [
        {
          url: episode.thumbnail || "https://mangeakkk.my.id/default-og.jpg",
          width: 800,
          height: 600,
          alt: episode.title,
        },
      ],
      type: "video.episode",
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description,
      images: [episode.thumbnail || "https://mangeakkk.my.id/default-og.jpg"],
    },
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <WatchClient slug={slug} />;
}
