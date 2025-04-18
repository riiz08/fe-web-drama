import AdsterraNative from "@/components/AdsterraNative";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/Heading";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { CalendarDays, Clock, Tv, Film, User } from "lucide-react";
import Script from "next/script";
import AdsterraBanner728x90 from "@/components/AdsterraBanner728x90";
import Banner from "@/components/Banner";

export default async function Page(promiseParams: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await promiseParams.params; // ✅ proper unwrapping of params
  const joinedSlug = slug.join("/");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/watch/${joinedSlug}`
  );

  const rawData = await res.json();
  const drama = rawData.data.drama;

  return (
    <section className="space-y-6">
      <Script
        strategy="afterInteractive"
        src="//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js"
      />
      <Breadcrumb />
      <AdsterraNative />

      <Heading title={drama.episodeTitle} />
      <VideoPlayer src={drama.videoSrc} />
      <AdsterraBanner728x90 />

      <div className="bg-default rounded-2xl p-6 shadow-md max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Poster */}
          <div className="md:col-span-1">
            <Image
              src={drama.thumbnail}
              height={320}
              width={195}
              alt={drama.title}
              className="rounded-xl w-full object-cover shadow-sm"
            />
          </div>
          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold text-white">{drama.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {drama.paragraph}
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-200">
              <li className="flex items-center gap-2">
                <Film size={16} /> <strong>Episod:</strong> {drama.episod}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays size={16} /> <strong>Tarikh Tayang:</strong>{" "}
                {drama.tarikhTayangan}
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} /> <strong>Waktu Siaran:</strong>{" "}
                {drama.waktuSiaran}
              </li>
              <li className="flex items-center gap-2">
                <Tv size={16} /> <strong>Rangkaian:</strong> {drama.rangkaian}
              </li>
              <li className="flex items-center gap-2">
                <User size={16} /> <strong>Pengarah:</strong> {drama.pengarah}
              </li>
              <li className="flex items-center gap-2">
                <User size={16} /> <strong>Produksi:</strong> {drama.produksi}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Banner />
    </section>
  );
}
