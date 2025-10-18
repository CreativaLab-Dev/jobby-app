"use client"

import { Eye } from "lucide-react"
import {CVData} from "@/types/cv";

interface CVPreviewProps {
  data: CVData
  type: string
}

export function CVPreview({ data, type }: CVPreviewProps) {
  return (
    <div className="text-center bg-white p-8 min-h-[500px] font-sans text-xs" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header with Name */}
      {data.personal?.fullName && (
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-black tracking-wide">{data.personal.fullName}</h1>
        </div>
      )}

      {/* Contact */}
      {data.personal && (data.personal.address || data.personal.linkedin || data.personal.phone || data.personal.email) && (
        <div className="mb-2">
          <p className="text-[15px] text-black text-center leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
            {data.personal.address && <span>{data.personal.address}</span>}
            {data.personal.address && (data.personal.linkedin || data.personal.phone || data.personal.email) && <span> • </span>}
            {data.personal.linkedin && (
              <a 
                href={data.personal.linkedin.startsWith('http') ? data.personal.linkedin : `https://${data.personal.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                {data.personal.linkedin}
              </a>
            )}
            {data.personal.linkedin && (data.personal.phone || data.personal.email) && <span> • </span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.phone && data.personal.email && <span> • </span>}
            {data.personal.email && <span>{data.personal.email}</span>}
          </p>
          <hr className="border-black mt-2" />
        </div>
      )}

      {/* Summary */}
      {data.personal?.summary && (
        <>
          <div className="mb-2">
            <p className="italic text-[14px] text-black leading-relaxed text-justify">{data.personal.summary}</p>
          </div>
        </>
      )}

      { /* Creo que no se usa... */ }
      {/* Experience or Projects */}
      {type === "becas" || type === "practicas" || type === "intercambios"
        ? data.projects?.items &&
          data.projects.items.length > 0 && (
            <div className="mb-2">
              <h2 className="text-left text-sm font-bold text-black mb-3 uppercase border-b border-black">
                PROYECTOS ACADÉMICOS
              </h2>
              {data.projects.items.map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-black">{project.title}</h3>
                    <span className="text-xs text-black whitespace-nowrap ml-2">{project.duration}</span>
                  </div>
                  <p className="text-xs text-black leading-relaxed text-justify mb-1">{project.description}</p>
                  {project.technologies && (
                    <p className="text-xs text-black">
                      <strong>Tecnologías:</strong> {project.technologies}
                    </p>
                  )}
                </div>
                    ))}
                  </div>
                )
              : data.experience?.items &&
                  data.experience.items.length > 0 && (
                  <div className="mb-2">
                    <h2 className="text-left text-[16px] font-bold text-black mb-3 uppercase border-b border-black">
                    EXPERIENCIA LABORAL
                    </h2>
                    {data.experience.items.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between items-start">
                      <h3 className="text-[15px] font-bold text-black">{exp.company}</h3>
                      <span className="text-xs text-black whitespace-nowrap ml-2 font-bold">{exp.location}</span>
                      </div>
                      <div className="flex justify-between items-start mb-1">
                      <p className="text-[15px] text-black">{exp.position}</p>
                      <span className="text-[15px] text-black whitespace-nowrap ml-2 italic">{exp.duration}</span>
                      </div>
                      <ul className="text-[15px] text-black leading-relaxed text-justify">
                      {exp.responsibilities && exp.responsibilities
                        .split("\n")
                        .map((line, idx) => (
                        <li key={idx} className="text-[15px] text-black leading-relaxed text-justify list-disc ml-6">
                          {line.replace(/^[-–•]\s*/, "")}
                        </li>
                        ))}
                      </ul>
                    </div>
                    ))}
                  </div>
                  )}

                {/* Education */}
      {data.education?.items && data.education.items.length > 0 && (
        <div className="mb-2">
          <h2 className="text-left text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
            EDUCACIÓN
          </h2>
          {data.education.items.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="text-[15px] font-bold text-black">{edu.institution}</h3>
                <span className="text-[15px] text-black whitespace-nowrap ml-2">{edu.location}</span>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-[15px] text-black">{edu.title}</p>
                <span className="text-[15px] text-black whitespace-nowrap ml-2 italic">{edu.year}</span>
              </div>
              {(edu.honors) && (
                <ul className="text-left text-[15px] text-black">
                  {edu.honors && <li>Honores: {edu.honors}</li>}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements or Certifications */}
      {type === "becas" || type === "practicas" || type === "intercambios"
        ? data.achievements?.items &&
          data.achievements.items.length > 0 && (
            <div className="mb-2">
              <h2 className="text-[16px] font-bold text-black mb-3 uppercase border-b border-black">
                LOGROS Y RECONOCIMIENTOS
              </h2>
              <p className="text-[15px] text-black leading-relaxed text-justify">
                {data.achievements.items
                  .map((achievement) => `${achievement.title}: ${achievement.description}`)
                  .join(". ")}
              </p>
            </div>
          )
        : data.certifications?.items &&
          data.certifications.items.length > 0 && (
            <div className="mb-2">
              <h2 className="text-left text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
                LICENCIAS Y CERTIFICACIONES
              </h2>
              <div className="text-[15px] text-black leading-relaxed text-justify">
                {data.certifications.items.map((cert, index) => <div key={cert.id || index} className="line-clamp-1">{cert.name} by {cert.issuer} ({new Date(cert.date).toLocaleDateString("en-US", { year: "numeric" })})</div>)}
              </div>
            </div>
          )}

      {/* Skills */}
      {data.skills && (data.skills.technical.length!==0 || data.skills.soft.length !==0 || data.skills.languages.length !==0) && (
        <div className="mb-2">
          <h2 className="text-left text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
            HABILIDADES PROFESIONALES Y PERSONALES
          </h2>
          <div className="text-[15px] text-black leading-relaxed">
            {data.skills.languages && data.skills.languages.length > 0 && (
              <p className="text-left">
                <strong>Idiomas:</strong> {data.skills.languages.join(", ")}
              </p>
            )}
            {data.skills.technical && data.skills.technical.length > 0 && (
              <p className="text-[15px] text-left">
                <strong>Habilidades Técnicas:</strong> {data.skills.technical.join(", ")}
              </p>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <p className="text-[15px] text-left">
                <strong>Habilidades Blandas:</strong> {data.skills.soft.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Empty state message */}
      {!data.personal?.fullName && (
        <div className="text-center py-12 text-gray-400">
          <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Completa los campos para ver la vista previa de tu CV</p>
        </div>
      )}
    </div>
  )
}
