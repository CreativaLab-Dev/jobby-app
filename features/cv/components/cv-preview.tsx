"use client"

import { Eye } from "lucide-react"
import {CVData} from "@/types/cv";

interface CVPreviewProps {
  data: CVData
  type: string
}

export function CVPreview({ data, type }: CVPreviewProps) {
  return (
    <div className="bg-white p-8 min-h-[400px] font-sans text-xs" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header with Name */}
      {data.personal?.fullName && (
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-black mb-4 tracking-wide uppercase">{data.personal.fullName}</h1>
        </div>
      )}

      {/* Summary */}
      {data.personal?.summary && (
        <>
          <div className="mb-2">
            <p className="text-xs text-black leading-relaxed text-justify">{data.personal.summary}</p>
          </div>
          {/*<hr className="border-black mb-6" />*/}
        </>
      )}

      {/* Contact */}
      {data.personal && (data.personal.phone || data.personal.email) && (
        <div className="mb-2">
          <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">CONTACTO</h2>
          <p className="text-xs text-black">
            {data.personal.phone} {data.personal.phone && data.personal.email && " - "} {data.personal.email}
          </p>
        </div>
      )}

      {/* Experience or Projects */}
      {type === "becas" || type === "practicas" || type === "intercambios"
        ? data.projects?.items &&
          data.projects.items.length > 0 && (
            <div className="mb-2">
              <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">
                PROYECTOS ACADÉMICOS
              </h2>
              {data.projects.items.map((project, index) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
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
              <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">
                EXPERIENCIA LABORAL
              </h2>
              {data.experience.items.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold text-black">{exp.position}</h3>
                    <span className="text-xs text-black whitespace-nowrap ml-2">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-black italic mb-1">{exp.company}</p>
                  <ul className="text-xs text-black leading-relaxed text-justify">
                    {exp.responsibilities && exp.responsibilities
                      .split("\n")
                      .map((line, idx) => (
                        <li key={idx} className="text-xs text-black leading-relaxed text-justify list-disc ml-4">
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
          <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">EDUCACIÓN</h2>
          {data.education.items.map((edu, index) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-black">{edu.institution}</h3>
                <span className="text-xs text-black whitespace-nowrap ml-2">{edu.year}</span>
              </div>
              <p className="text-xs text-black italic mb-1">{edu.title}</p>
              {(edu.gpa || (edu.status && edu.status !== "Completado")) && (
                <ul className="ml-4 text-xs text-black">
                  {edu.gpa && <li>Promedio: {edu.gpa}</li>}
                  {edu.status && edu.status !== "Completado" && <li>{edu.status}</li>}
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
              <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">
                LOGROS Y RECONOCIMIENTOS
              </h2>
              <p className="text-xs text-black leading-relaxed text-justify">
                {data.achievements.items
                  .map((achievement) => `${achievement.title}: ${achievement.description}`)
                  .join(". ")}
              </p>
            </div>
          )
        : data.certifications?.items &&
          data.certifications.items.length > 0 && (
            <div className="mb-2">
              <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">
                LICENCIAS Y CERTIFICACIONES
              </h2>
              <p className="text-xs text-black leading-relaxed text-justify">
                {data.certifications.items.map((cert, index) => <div key={index} className="line-clamp-1">{cert.name} by {cert.issuer} ({new Date(cert.date).toLocaleDateString("en-US", { year: "numeric" })})</div>)}
              </p>
            </div>
          )}

      {/* Skills */}
      {data.skills && (data.skills.technical.length!==0 || data.skills.soft.length !==0 || data.skills.languages.length !==0) && (
        <div className="mb-2">
          <h2 className="text-sm font-bold text-black mb-3 uppercase border-b border-black pb-1">
            HABILIDADES PROFESIONALES Y PERSONALES
          </h2>
          <div className="text-xs text-black leading-relaxed">
            {data.skills.languages && data.skills.languages.length > 0 && (
              <p className="mb-1">
                <strong>Idiomas:</strong> {data.skills.languages.join(", ")}
              </p>
            )}
            {data.skills.technical && data.skills.technical.length > 0 && (
              <p className="mb-1">
                <strong>Habilidades Técnicas:</strong> {data.skills.technical.join(", ")}
              </p>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <p className="mb-1">
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
