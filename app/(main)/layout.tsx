import type { Metadata } from 'next'
import { Navbar } from "@/components/navbar";
import { getCountAvailableAttempts } from "@/lib/get-count-availables-attempts";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";
import { TermsModal } from "@/components/terms-modal";

export const metadata: Metadata = {
  title: 'CV Score',
  description: 'Cv Score potenciado con inteligencia artificial'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const userLimits = await getCountAvailableAttempts();
  if (!userLimits) {
    redirect('404');
  }
  const user = await getUser()
  const isTermsAccepted = user?.acceptedTermsAndConditions && user?.acceptedPrivacyPolicy || false;
  return (
    <div className="flex min-h-screen relative w-full">
      {/* <AppSidebar /> */}
      <div className="flex-1 flex flex-col">
        <Navbar userLimit={userLimits} user={user} />
        <main className="flex-1 transition-all duration-300">{children}</main>
        <TermsModal isOpen={!isTermsAccepted} userId={user.id} />
      </div>
    </div>
    // <SidebarProvider defaultOpen={false}>

    // </SidebarProvider>
  )
}
