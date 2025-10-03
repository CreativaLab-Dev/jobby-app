interface CVSkillsProps {
  skills?: {
    technical?: string[]
    soft?: string[]
    languages?: string[]
  }
}

export function CVSkills({ skills }: CVSkillsProps) {
  if (!skills || (!skills.technical && !skills.soft && !skills.languages)) {
    return null
  }

  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">
        HABILIDADES PROFESIONALES Y PERSONALES
      </h2>
      <div className="text-sm text-black leading-relaxed">
        {skills.languages && (
          <p className="mb-2">
            <strong>Idiomas:</strong> {skills.languages.join(", ")}
          </p>
        )}
        {skills.technical && (
          <p className="mb-2">
            <strong>Habilidades Técnicas:</strong> {skills.technical.join(", ")}
          </p>
        )}
        {skills.soft && (
          <p className="mb-2">
            <strong>Habilidades Blandas:</strong> {skills.soft.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}
