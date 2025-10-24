// features/cv-preview/components/cv-education.tsx
interface EducationItem {
  id: string
  level?: string
  institution?: string
  location?: string
  title?: string
  year?: string
  honors?: string
}

interface CVEducationProps {
  education?: {
    items?: EducationItem[]
  }
}

export function CVEducation({ education }: CVEducationProps) {
  console.log("🎓 CVEducation - education data:", education);
  
  if (!education?.items || education.items.length === 0) {
    return null;
  }

  // Asegurar keys únicas para evitar el error de React
  const validItems = education.items.map((edu, index) => ({
    ...edu,
    _uniqueKey: edu.id && edu.id.trim() !== '' ? edu.id : `edu-${index}-${Math.random().toString(36).substr(2, 9)}`
  }));

  return (
    <div className="mb-2">
      <h2 className="text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
        EDUCACIÓN
      </h2>
      {validItems.map((edu) => (
        <div key={edu._uniqueKey} className="mb-3">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-bold text-black">{edu.institution}</h3>
            <span className="text-[15px] text-black whitespace-nowrap ml-2">{edu.location}</span>
          </div>
          <div className="flex justify-between items-start">
            <p className="text-[15px] text-black">{edu.title}</p>
            <span className="text-[15px] text-black whitespace-nowrap ml-2 italic">{edu.year}</span>
          </div>
          {edu.honors && (
            <ul className="text-left text-[15px] text-black">
              <li>Honores: {edu.honors}</li>
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}