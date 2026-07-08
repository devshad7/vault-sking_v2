import Navbar from "@/components/layout/Navbar/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Navbar/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
