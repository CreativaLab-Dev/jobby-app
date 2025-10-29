import { Recommendation, ScoreCategory } from "@/types/analysis";
import type { CvEvaluation, EvaluationScore, Recommendation as PrismaRecommendation } from "@prisma/client"

export function mapEvaluationToAnalysis(cvEvaluation: CvEvaluation & { scores: EvaluationScore[], recommendations: PrismaRecommendation[] }) {
  const scoreBreakdown: ScoreCategory[] = cvEvaluation.scores.map((score) => {
    const colorMap: Record<string, { color: string; bg: string; icon: string }> = {
      EXPERIENCE: { color: "#16a34a", bg: "#dcfce7", icon: "Briefcase" },
      EDUCATION: { color: "#2563eb", bg: "#dbeafe", icon: "GraduationCap" },
      SKILLS: { color: "#7c3aed", bg: "#ede9fe", icon: "Sparkles" },
      PROJECTS: { color: "#ea580c", bg: "#ffedd5", icon: "Folder" },
      DEFAULT: { color: "#6b7280", bg: "#f3f4f6", icon: "FileText" },
    }

    const section = score.sectionType || "DEFAULT"
    const style = colorMap[section] || colorMap.DEFAULT

    return {
      category: section,
      icon: style.icon,
      score: score.score,
      maxScore: 100,
      color: style.color,
      bgColor: style.bg,
      items: score.detailsJson?.['bullets'] || [],
    }
  })

  // 2️⃣ Mapeamos las recomendaciones
  const recommendations: Recommendation[] = cvEvaluation.recommendations.map((rec) => {
    let type: Recommendation["type"] = "suggestion"
    let icon = "Info"
    let impact = "Low impact"

    if (rec.severity === "high") {
      type = "critical"
      icon = "AlertTriangle"
      impact = "High impact"
    } else if (rec.severity === "medium") {
      type = "important"
      icon = "AlertCircle"
      impact = "Moderate impact"
    }

    return {
      type,
      icon,
      title: rec.sectionType || "General",
      description: rec.text,
      impact,
    }
  })

  // 3️⃣ Retornamos la estructura final
  return {
    scoreAnalysis: {
      overallScore: cvEvaluation.overallScore ?? 0,
    },
    scoreBreakdown,
    recommendations,
  }
}
