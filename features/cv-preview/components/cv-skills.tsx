interface CVSkillsProps {
  skills?: {
    technical?: string[]
    soft?: string[]
    languages?: string[]
  }
}

export function CVSkills({ skills }: CVSkillsProps) {
  if (!skills || (skills.technical?.length === 0 && skills.soft?.length === 0 && skills.languages?.length === 0)) {
    return null
  }

  return (
    <div className="mb-2">
      <h2 className="text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
        HABILIDADES PROFESIONALES Y PERSONALES
      </h2>
      <div className="text-[15px] text-black leading-relaxed">
        {skills.languages && skills.languages.length > 0 && (
          <p className="text-left">
            <strong>Idiomas:</strong> {skills.languages.join(", ")}
          </p>
        )}
        {skills.technical && skills.technical.length > 0 && (
          <p className="text-[15px] text-left">
            <strong>Habilidades Técnicas:</strong> {skills.technical.join(", ")}
          </p>
        )}
        {skills.soft && skills.soft.length > 0 && (
          <p className="text-[15px] text-left">
            <strong>Habilidades Blandas:</strong> {skills.soft.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}
