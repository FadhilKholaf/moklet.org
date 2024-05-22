import { ReactNode } from "react";

interface SectionWrapperProps {
  children?: ReactNode;
  id: string;
}

export function SectionWrapper({
  children,
  id,
}: Readonly<SectionWrapperProps>) {
  return (
    <section className="relative w-full py-[82px]" id={id}>
      {children}
    </section>
  );
}

export function SmallSectionWrapper({
  children,
  id,
}: Readonly<SectionWrapperProps>) {
  return (
    <section className="w-full py-[32px] mt-[42px] xl:mt-0" id={id}>
      {children}
    </section>
  );
}
