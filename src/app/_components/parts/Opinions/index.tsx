import { UnderlineTitle } from "../../global/Text";
import { SectionWrapper } from "../../global/Wrapper";
import Saying from "./Saying";

export default function Opinions() {
  return (
    <SectionWrapper id="pendapat">
      <div className="flex flex-col justify-center">
        <UnderlineTitle lineWidth={"232px"}>
          Kata Mereka Tentang Organisasi dan Sub-Organisasi Moklet
        </UnderlineTitle>
        <div className="mt-[54px] flex flex-col md:flex-row gap-[18px] w-full">
          <div className="flex flex-col gap-[24px] w-full md:w-[75%]">
            <div className="flex flex-col md:flex-row gap-[18px] w-full">
              <div className="flex w-full md:w-1/2 items-center justify-center rounded-2xl border border-neutral-400 px-[28px] py-[32px]">
                <Saying
                  personData={{
                    name: "Rina Setiawan",
                    role: "Pembimbing Media Moklet",
                    image:
                      "https://i.scdn.co/image/ab67616d00001e02f99ee9d6d91c399522b0baf9",
                  }}
                  saying="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nulla ullamcorper odio justo."
                />
              </div>
              <div className="flex w-full md:w-1/2 items-center justify-center rounded-2xl border border-neutral-400 px-[28px] py-[32px]">
                <Saying
                  personData={{
                    name: "Ibani Hillabi",
                    role: "Ketua PASKATEMA 2023/2024",
                    image:
                      "https://i.scdn.co/image/ab67616d00001e02f99ee9d6d91c399522b0baf9",
                  }}
                  saying="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nulla ullamcorper odio justo."
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center rounded-2xl border border-neutral-400 px-[28px] py-[32px]">
              <Saying
                personData={{
                  name: "Ibani Hillabi",
                  role: "Ketua PASKATEMA 2023/2024",
                  image:
                    "https://i.scdn.co/image/ab67616d00001e02f99ee9d6d91c399522b0baf9",
                }}
                saying="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  ullamcorper odio justo, vitae blandit lacus facilisis
                  lobortis. Nulla facilisi. Nunc sodales magna nec ante
                  hendrerit, et vulputate elit fermentum. magna nec ante
                  hendrerit, et vulputate elit fermentum."
              />
            </div>
          </div>
          <div className="flex w-full md:w-[25%] items-center justify-center rounded-2xl border border-neutral-400 px-[28px] py-[32px]">
            <Saying
              personData={{
                name: "Budi Prasetyo",
                role: "Ketua METIC 2024",
                image:
                  "https://i.scdn.co/image/ab67616d00001e02f99ee9d6d91c399522b0baf9",
              }}
              saying="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  ullamcorper odio justo, vitae blandit lacus facilisis lobortis.
                  Nulla facilisi. Nunc sodales magna nec ante hendrerit, et
                  vulputate elit fermentum. magna nec ante hendrerit, et vulputate
                  elit fermentum."
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
