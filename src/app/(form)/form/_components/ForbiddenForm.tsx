import { Metadata } from "next";

import LinkButton from "@/app/_components/global/Button";
import Image from "@/app/_components/global/Image";
import { H2, P } from "@/app/_components/global/Text";
import { SectionWrapper } from "@/app/_components/global/Wrapper";

export const metadata: Metadata = {
  title: "Formulir ditutup",
};

export default function ForbiddenForm({ message }: { message?: string }) {
  return (
    <>
      <main className="mx-auto w-full max-w-[1192px] px-5 py-[22px]">
        <SectionWrapper id="forbidden">
          <div className="flex flex-col justify-center items-center gap-20">
            <Image
              src={"/images/Forbidden.svg"}
              alt={"404"}
              width={460}
              height={244}
            />
            <div className="flex flex-col items-center justify-center">
              <div className="mb-11 text-center">
                <H2 className="mb-[18px]">
                  {message ?? "Formulir sedang tidak menerima jawaban!"}
                </H2>
                <P>
                  Hubungi pemilik formulir jika menurut Anda ini tidak benar
                </P>
              </div>
              <LinkButton variant={"primary"} href="/">
                Kembali ke beranda
              </LinkButton>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}
