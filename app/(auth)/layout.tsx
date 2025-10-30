import Footer from "@/components/footer";
import Header from "@/components/header";
import { getSession } from "@/lib/shared/session";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log('PublicLayout session:', session);

  return (
    <div className="flex min-h-screen flex-col">
      <Header authenticated={session?.success} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}