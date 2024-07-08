import { H4, P } from "@/app/_components/global/Text";
import { SectionWrapper } from "@/app/_components/global/Wrapper";
import OpenedBook from "@/app/_components/icons/OpenedBook";

export default function VisiMisi({
  visi,
  misi,
}: {
  visi: string;
  misi: string;
}) {
  return (
    <SectionWrapper
      id="visimisi"
      className="flex justify-between w-full py-[62px] flex-col gap-8 md:flex-row"
    >
      <div className="absolute bg-primary-400 w-screen h-full -translate-x-1/2 left-1/2 -z-[999] -top-1/2 translate-y-1/2"></div>
      <div className="flex gap-7 w-full md:w-[48%]">
        <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center">
          <OpenedBook />
        </div>
        <div className="flex flex-col gap-2 w-[291px] sm:w-[85%] xl:w-[425px]">
          <H4 className="text-white">Visi</H4>
          <P className="text-white text-wrap w-[100%] break-words">{visi}</P>
        </div>
      </div>
      <div className="flex gap-7 w-full md:w-[48%]">
        <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center">
          <OpenedBook />
        </div>
        <div className="flex flex-col gap-2 w-[291px] sm:w-[85%] xl:w-[425px]">
          <H4 className="text-white">Misi</H4>
          <P className="text-white text-wrap w-[100%] break-words">{misi}</P>
        </div>
      </div>
    </SectionWrapper>
  );
}
