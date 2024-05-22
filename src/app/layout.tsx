import type { Metadata, Viewport } from "next";
import { NextAuthProvider } from "./_components/main/NextAuthProvider";
import ProgressBarProvider from "./_components/main/ProgressBarProvider";
import { Montserrat } from "next/font/google";
import Toaster from "./_components/main/CustomToaster";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const robots =
  process.env.APP_ENV != "production" ? "noindex, nofollow" : "index, follow";

export const metadata: Metadata = {
  title: {
    default: "Moklet Organization",
    template: "%s | Moklet.org",
  },
  description:
    "A one doorway to explore Moklet's organizations' creativity and innovations",
  keywords: "moklet.org, Moklet, Moklet.org, Telkom, SMK, Malang",
  authors: { name: "MokletDev", url: "https://mokletdev.vercel.app" },
  creator: "MokletDev Team",
  publisher: "SMK Telkom Malang",
  robots: robots,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={montserrat.className}>
        <NextAuthProvider>
          <Toaster />
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
