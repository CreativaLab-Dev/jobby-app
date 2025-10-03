import {CVListPage} from "@/features/cv/components/cv-list-page";
import {getCvForCurrentUser} from "@/features/cv/actions/get-cv-for-current-user";
import { ScoresListPage } from "@/features/analysis/components/score-list";
import {getCountAvailableAttempts} from "@/lib/get-count-availables-attempts";

export default async function CVPage() {
  let cvs = await getCvForCurrentUser();
  if (!cvs || cvs?.length===0) {
    cvs = []
  }
  
  // Map each CV + its analyses to the shape the ScoresListPage wants
  const cvAnalyzedMapped = cvs.flatMap((cv) => {
    // sort analyses by createdAt ascending
    const sortedAnalyses = [...cv.analyses].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    
    return sortedAnalyses.map((analysis, idx) => {
      // build categories: { sectionName: score, ... }
      const categories = analysis.sectionScores.reduce<Record<string, number>>(
        (acc, section) => {
          acc[section.sectionName] = section.score;
          return acc;
        },
        {}
      );
      
      // compute trend: first one is "up", others compare to previous
      const trend: "up" | "down" =
        idx === 0
          ? "up"
          : analysis.overallScore > sortedAnalyses[idx - 1].overallScore
            ? "up"
            : "down";
      
      // grab just the titles of recommendations
      const recommendations = analysis.recommendations.map((r) => r.title);
      
      return {
        id: analysis.id,
        cvTitle: cv.title ?? "",
        overallScore: analysis.overallScore,
        categories,
        recommendations,
        date: analysis.createdAt.toISOString(), // or keep as Date if you prefer
        trend,
      };
    });
  });
  const userLimits = await getCountAvailableAttempts();
  if (!userLimits) {
    console.log("[ERROR_GET_COUNT_AVAILABLE_ATTEMPTS]");
  }
  
  const exhaustedAttemptCreateCv = userLimits?.cvCreations.used >= userLimits?.cvCreations.total;
  const exhaustedAttemptScoreAnalyze = userLimits?.scoreAnalysis.used >= userLimits?.scoreAnalysis.total
  
  return <>
    <CVListPage cvs={cvs} disabledButton={exhaustedAttemptCreateCv} />
    <ScoresListPage cvAnalyzed={cvAnalyzedMapped} disabledButton={exhaustedAttemptScoreAnalyze}  />
  </>
}
