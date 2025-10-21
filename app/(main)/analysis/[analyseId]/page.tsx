import AnalysisScore from "@/features/analysis/components/score-analysis";
import { getScoreById } from "@/features/analysis/actions/get-score-by-id";
import { mapToScoreCategories } from "@/features/analysis/dto/map-to-score-categories";
import { mapToRecommendations } from "@/features/analysis/dto/map-to-recommendations";

interface ScoreAnalysisPageProps {
  params: Promise<{
    analyzeId: string;
  }>
}

export default async function ScoreAnalysisPage({ params }: ScoreAnalysisPageProps) {
  const { analyzeId } = await params;
  const scoreAnalysis = await getScoreById(analyzeId);

  if (!scoreAnalysis) {
    return <div className="text-center text-gray-500">No score analysis available.</div>;
  }


  const scoreBreakdown = scoreAnalysis
    ? mapToScoreCategories(scoreAnalysis.sectionScores, scoreAnalysis.cv.opportunityType)
    : [];

  const recommendations = mapToRecommendations(scoreAnalysis.recommendations) || [];
  return (
    <AnalysisScore
      scoreBreakdown={scoreBreakdown}
      cvScore={scoreAnalysis?.overallScore ?? 0}
      recommendations={recommendations}
    />
  )
}