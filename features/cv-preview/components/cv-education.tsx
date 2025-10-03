interface EducationItem {
  institution?: string
  year?: string
  degree?: string
  gpa?: string
  status?: string
  title?: string
}

interface CVEducationProps {
  education?: {
    items?: EducationItem[]
  }
}

export function CVEducation({ education }: CVEducationProps) {
  if (!education?.items || education.items.length === 0) return null

  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">EDUCACIÓN</h2>
      {education.items.map((edu, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-start mb-0">
            <h3 className="text-sm font-bold text-black">{edu.title}</h3>
            <span className="text-sm text-black whitespace-nowrap ml-4">{edu.year}</span>
          </div>
          <p className="text-sm text-black">{edu.institution}</p>
          <p className="text-sm text-black italic mb-2">{edu.degree}</p>
          {(edu.gpa || (edu.status && edu.status !== "Completado")) && (
            <ul className="ml-5 text-sm text-black">
              {edu.gpa && <li>Promedio: {edu.gpa}</li>}
              {edu.status && edu.status !== "Completado" && <li>{edu.status}</li>}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
