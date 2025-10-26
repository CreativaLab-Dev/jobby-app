import type { Metadata } from 'next'
import { getUser } from "@/lib/shared/get-user";
import { getCurrentSubscription } from "@/lib/shared/get-count-availables-attempts";
import { TermsModal } from "@/components/terms-modal";
import '../globals.css';
import { NavbarWrapper } from '@/components/navbar-wrapper';

export const metadata: Metadata = {
    title: 'Jobby - Tu talento merece ser visible',
    description: 'Jobby potenciado con inteligencia artificial',
    authors: [{ name: 'Jobby' }],
    openGraph: {
        title: 'Jobby - CV inteligente para creativos',
        description: 'Transforma tu talento en un CV ganador. Optimizado con IA para jóvenes profesionales creativos.',
        type: 'website',
        images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@jobby_ai',
        images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
    },
}

export const dynamic = "force-dynamic";
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {
    const currentSubscription = await getCurrentSubscription();
    const user = await getUser()
    const isTermsAccepted = user?.acceptedTermsAndConditions && user?.acceptedPrivacyPolicy || false;
    let userLimits = {
        cvCreations: {
            used: 0,
            total: 0
        },
        scoreAnalysis: {
            used: 0,
            total: 0
        }
    }

    if (currentSubscription) {
        userLimits = {
            cvCreations: {
                used: currentSubscription.manualCvsUsed,
                total: currentSubscription.plan.manualCvLimit
            },
            scoreAnalysis: {
                used: currentSubscription.uploadCvsUsed,
                total: currentSubscription.plan.uploadCvLimit
            }
        }
    }

    return (
        <>
            <div className="flex min-h-screen relative w-full">
                <div className="flex-1 flex flex-col">
                    <NavbarWrapper hasSubscription={!!currentSubscription} userLimit={userLimits} user={user} />
                    <main className="flex-1 transition-all duration-300">{children}</main>
                    <TermsModal isOpen={!isTermsAccepted} userId={user?.id} />
                </div>
            </div>
        </>
    )
}
