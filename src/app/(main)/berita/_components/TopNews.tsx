import { H2, H4 } from "@/app/_components/global/Text";
import { SmallSectionWrapper } from "@/app/_components/global/Wrapper";
import { findPopularPost } from "@/utils/database/post.query";

import { WideNewsFigure } from "./parts/WideNewsFigure";

export default async function TopNews() {
  const popularNews = await findPopularPost(4);

  return (
    <SmallSectionWrapper id="TopNews">
      <div className="flex flex-col gap-[54px]">
        <H4 className="block text-wrap sm:hidden">
          Berita Terpopuler Organisasi & Sub Organ Moklet
        </H4>
        <H2 className="text-wrap hidden w-full sm:block">
          Berita Terpopuler Organisasi & Sub Organ Moklet
        </H2>
        <div className="flex flex-col gap-y-[42px] items-center justify-between w-full md:flex-row flex-wrap">
          {popularNews.map((post) => (
            <WideNewsFigure post={post} key={post.id} />
          ))}
        </div>
      </div>
    </SmallSectionWrapper>
  );
}
