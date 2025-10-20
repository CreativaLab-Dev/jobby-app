import type { Metadata } from 'next'
import { Navbar } from "@/components/navbar";
import { getCurrentSubscription } from "@/lib/shared/get-count-availables-attempts";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/shared/get-user";
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
  const currentSubscription = await getCurrentSubscription();
  if (!currentSubscription) {
    // redirect('404');
    console.log('No subscription found');
  }
  const user = await getUser()
  const isTermsAccepted = user?.acceptedTermsAndConditions && user?.acceptedPrivacyPolicy || false;

  const userLimits: {
    userLimit?: {
      cvCreations: {
        used: number
        total: number
      },
      scoreAnalysis: {
        used: number
        total: number
      }
    }
  } = {
    userLimit: {
      cvCreations: {
        used: 0,
        total: 0
      },
      scoreAnalysis: {
        used: 0,
        total: 0
      }
    }
  }

  return (
    <div className="flex min-h-screen relative w-full">
      {/* <AppSidebar /> */}
      <div className="flex-1 flex flex-col">
        <Navbar userLimit={userLimits.userLimit} user={user} />
        <main className="flex-1 transition-all duration-300">{children}</main>
        <TermsModal isOpen={!isTermsAccepted} userId={user.id} />
      </div>
    </div>
    // <SidebarProvider defaultOpen={false}>

    // </SidebarProvider>
  )
}
