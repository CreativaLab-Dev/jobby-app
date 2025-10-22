import type { Metadata } from 'next'
import { Navbar } from "@/components/navbar";
import { getUser } from "@/lib/shared/get-user";
import { getCurrentSubscription } from "@/lib/shared/get-count-availables-attempts";
import { TermsModal } from "@/components/terms-modal";
import '../globals.css';

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
        <>
            <div className="flex min-h-screen relative w-full">
                <div className="flex-1 flex flex-col">
                    <Navbar userLimit={{
                        cvCreations: {
                            used: 0,
                            total: 0
                        },
                        scoreAnalysis: {
                            used: 0,
                            total: 0
                        }
                    }} user={user} />
                    <main className="flex-1 transition-all duration-300">{children}</main>
                    <TermsModal isOpen={!isTermsAccepted} userId={user?.id} />
                </div>
            </div>
        </>
    )
}
