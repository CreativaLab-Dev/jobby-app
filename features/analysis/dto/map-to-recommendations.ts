import {Recommendation} from "@prisma/client";
import {Recommendation as RecommendationType} from "@/types/analysis";

export function mapToRecommendations(
  recommendations: Recommendation[],
): RecommendationType[] {
  return recommendations.map((rec) => {
    // Map the priority to icon name
    return {
      icon: rec.priority,
      title: rec.title,
      description: rec.description,
      impact: rec.priority,
      type: rec.priority === "high" ? "critical" : rec.priority === "medium" ? "important" : "suggestion",
    };
  })
}
