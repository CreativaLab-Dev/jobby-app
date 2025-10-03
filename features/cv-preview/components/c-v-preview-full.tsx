import { CVHeader } from "./cv-header"
import { CVContact } from "./cv-contact"
import { CVExperience } from "./cv-experience"
import { CVProjects } from "./cv-projects"
import { CVEducation } from "./cv-education"
import { CVAchievements } from "./cv-achievements"
import { CVCertifications } from "./cv-certifications"
import { CVSkills } from "./cv-skills"
import {CVData} from "@/types/cv";

interface CVPreviewProps {
  data: CVData
  type: string
}

export function CVPreviewFull({ data, type }: CVPreviewProps) {
  const isAcademicType = type === "becas" || type === "practicas" || type === "intercambios"

  return (
    <div className="bg-white p-12 min-h-[800px] font-sans" style={{ fontFamily: "Arial, sans-serif" }}>
      <CVHeader name={data.personal?.fullName} />

      {data.personal?.summary && (
        <>
          <div className="mb-4">
            <p className="text-sm text-black leading-relaxed text-justify">{data.personal.summary}</p>
          </div>
        </>
      )}

      <CVContact personal={data.personal} />

      {isAcademicType ? <CVProjects projects={data.projects} /> : <CVExperience experience={data.experience} />}

      <CVEducation education={data.education} />

      {isAcademicType ? (
        <CVAchievements achievements={data.achievements} />
      ) : (
        <CVCertifications certifications={data.certifications} />
      )}

      <CVSkills skills={data.skills} />
    </div>
  )
}
