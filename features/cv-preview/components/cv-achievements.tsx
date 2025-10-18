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
    <div className="mb-2">
      <h2 className="text-[16px] font-bold text-black mb-3 uppercase border-b border-black">
        LOGROS Y RECONOCIMIENTOS
      </h2>
      <p className="text-[15px] text-black leading-relaxed text-justify">
        {achievements.items.map((achievement) => `${achievement.title}: ${achievement.description}`).join(". ")}
      </p>
    </div>
  )
}
