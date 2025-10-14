import { Navbar } from "@/components/navbar";
import Footer from "../../features/home/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}