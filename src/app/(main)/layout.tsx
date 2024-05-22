import Navbar from "../_components/global/Navbar";
import Footer from "../_components/global/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[94%] lg:max-w-[87.5%] xl:max-w-[1192px] py-[22px]">
        {children}
        <Footer />
      </main>
    </>
  );
}
