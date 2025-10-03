interface ExperienceItem {
  position?: string
  duration?: string
  company?: string
  responsibilities?: string
}

interface CVExperienceProps {
  experience?: {
    items?: ExperienceItem[]
  }
}

export function CVExperience({ experience }: CVExperienceProps) {
  if (!experience?.items || experience.items.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">EXPERIENCIA LABORAL</h2>
      {experience.items.map((exp, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-black">{exp.position}</h3>
            <span className="text-sm text-black whitespace-nowrap ml-4">{exp.duration}</span>
          </div>
          <p className="text-sm text-black italic mb-2">{exp.company}</p>
          <p className="text-sm text-black leading-relaxed text-justify">
            {exp.responsibilities && exp.responsibilities
              .split("\n")
              .map((line, idx) => (
                <li key={idx} className="text-xs text-black leading-relaxed text-justify list-disc ml-4">
                  {line.replace(/^[-–•]\s*/, "")}
                </li>
              ))}
          </p>
        </div>
      ))}
    </div>
  )
}
