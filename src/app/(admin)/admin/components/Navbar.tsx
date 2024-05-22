"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { DashboardIcon, HamburgerIcon } from "./Icons";
import { useState } from "react";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { Session } from "next-auth";
import { P } from "@/app/_components/global/Text";
import { PrimaryButton } from "@/app/_components/global/Button";
import { signOut } from "next-auth/react";

interface NavOption {
  title: string;
  href: string;
}

const navOptions: NavOption[] = [
  { title: "Beranda", href: "/" },
  { title: "Berita", href: "/berita" },
  { title: "Sub-organ", href: "/sub-organ" },
  { title: "Tentang", href: "/tentang" },
  { title: "Kontributor", href: "/kontributor" },
];

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const allowedRoutes = protectedRoutes.filter(
    (item) =>
      item.roles == "All" ||
      item.roles.includes(session?.user?.role!) ||
      (!session?.user?.role?.includes("Admin") &&
        item.roles.includes("SubOrgan")),
  );

  return (
    <nav className="xl:relative fixed z-[999] mx-auto w-full flex flex-col lg:hidden">
      <div className="w-full flex xl:max-w-[1192px] z-[999] py-4 xl:py-0 px-5 bg-white xl:bg-transparent justify-between">
        <Link href={"/"} className="block xl:mt-8">
          <Image
            src={"/horizontal.svg"}
            alt="Logo moklet.org"
            width={120}
            height={50}
            className="pointer-events-none h-[50px] w-[130px]"
          />
        </Link>
        <button
          className="block xl:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        className={`block xl:hidden py-3 w-full z-[800] bg-white transition-all duration-500 ${isExpanded ? "mt-0" : " -mt-[650px]"}`}
      >
        <div className="flex flex-col gap-8 text-start justify-start items-start my-[21px] mx-5">
          <ul className="space-y-4 pb-2 w-full">
            <li>
              <Link
                href={"/admin"}
                className="group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-100 transition-all"
              >
                <DashboardIcon />
                <P className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
                  Dashboard
                </P>
              </Link>
            </li>
            <P className="font-semibold">Menu</P>
            {allowedRoutes.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={
                    (pathname.includes(item.path) ? "bg-red-100 " : "") +
                    "group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-200 transition-all"
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <P className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
                    {item.title}
                  </P>
                </Link>
              </li>
            ))}
            <PrimaryButton onClick={() => signOut()} className="w-full">
              Log Out
            </PrimaryButton>
          </ul>
        </div>
      </div>
    </nav>
  );
}
