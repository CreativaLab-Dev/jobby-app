import { ProgressStatus } from "@/features/analysis/components/progress-status"
import { Suspense } from "react"

interface ProgressPageProps {
  params: Promise<{
    cvId: string
  }>
}

export default async function ProgressPage({ params }: ProgressPageProps) {
  const { cvId } = await params
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProgressStatus cvId={cvId} />
      </Suspense>
    </div>
  )
}