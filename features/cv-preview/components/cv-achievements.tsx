interface AchievementItem {
  title?: string
  description?: string
}

interface CVAchievementsProps {
  achievements?: {
    items?: AchievementItem[]
  }
}

export function CVAchievements({ achievements }: CVAchievementsProps) {
  if (!achievements?.items || achievements.items.length === 0) return null

  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">
        LOGROS Y RECONOCIMIENTOS
      </h2>
      <p className="text-sm text-black leading-relaxed text-justify">
        {achievements.items.map((achievement) => `${achievement.title}: ${achievement.description}`).join(". ")}
      </p>
    </div>
  )
}
