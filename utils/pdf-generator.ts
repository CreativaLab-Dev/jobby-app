export function generatePDFContent(data: any, type: string) {
  let content = ""

  // Header with name
  if (data.personal?.fullName) {
    content += `
      <div class="header">
        <h1>${data.personal.fullName.toUpperCase()}</h1>
      </div>
    `
  }

  // Summary
  if (data.personal?.summary) {
    content += `
      <div class="summary">
        ${data.personal.summary}
      </div>
      <div class="section-divider"></div>
    `
  }

  // Contact
  if (data.personal) {
    content += `
      <div class="section">
        <div class="section-title">CONTACTO</div>
        <div class="contact-info">
          ${data.personal.phone || ""} - ${data.personal.email || ""}
        </div>
      </div>
    `
  }

  // Experience or Projects
  const isAcademicType = type === "becas" || type === "practicas" || type === "intercambios"

  if (isAcademicType) {
    if (data.projects?.items && data.projects.items.length > 0) {
      content += `
        <div class="section">
          <div class="section-title">PROYECTOS ACADÉMICOS</div>
          ${data.projects.items
            .map(
              (project: any) => `
              <div class="project-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${project.title || ""}</div>
                  </div>
                  <div class="item-date">${project.duration || ""}</div>
                </div>
                <div class="item-description">${project.description || ""}</div>
                ${project.technologies ? `<div class="item-description"><strong>Tecnologías:</strong> ${project.technologies}</div>` : ""}
              </div>
            `,
            )
            .join("")}
        </div>
      `
    }
  } else {
    if (data.experience?.items && data.experience.items.length > 0) {
      content += `
        <div class="section">
          <div class="section-title">EXPERIENCIA LABORAL</div>
          ${data.experience.items
            .map(
              (exp: any) => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position || ""}</div>
                  </div>
                  <div class="item-date">${exp.duration || ""}</div>
                </div>
                <div class="item-subtitle">${exp.company || ""}</div>
                <div class="item-description">${exp.responsibilities || ""}</div>
              </div>
            `,
            )
            .join("")}
        </div>
      `
    }
  }

  // Education
  if (data.education?.items && data.education.items.length > 0) {
    content += `
      <div class="section">
        <div class="section-title">EDUCACIÓN</div>
        ${data.education.items
          .map(
            (edu: any) => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.institution || ""}</div>
                </div>
                <div class="item-date">${edu.year || ""}</div>
              </div>
              <div class="item-subtitle">${edu.degree || ""}</div>
              ${
                edu.gpa || edu.status
                  ? `
                <ul class="item-details">
                  ${edu.gpa ? `<li>Promedio: ${edu.gpa}</li>` : ""}
                  ${edu.status && edu.status !== "Completado" ? `<li>${edu.status}</li>` : ""}
                </ul>
              `
                  : ""
              }
            </div>
          `,
          )
          .join("")}
      </div>
    `
  }

  // Certifications or Achievements
  if (isAcademicType) {
    if (data.achievements?.items && data.achievements.items.length > 0) {
      content += `
        <div class="section">
          <div class="section-title">LOGROS Y RECONOCIMIENTOS</div>
          <div class="item-description">
            ${data.achievements.items.map((achievement: any) => `${achievement.title || ""}: ${achievement.description || ""}`).join(". ")}
          </div>
        </div>
      `
    }
  } else {
    if (data.certifications?.items && data.certifications.items.length > 0) {
      content += `
        <div class="section">
          <div class="section-title">LICENCIAS Y CERTIFICACIONES</div>
          <div class="item-description">
            ${data.certifications.items.map((cert: any) => `${cert.name || ""} - ${cert.issuer || ""}`).join(". ")}
          </div>
        </div>
      `
    }
  }

  // Skills
  if (data.skills && (data.skills.technical || data.skills.soft || data.skills.languages)) {
    content += `
      <div class="section">
        <div class="section-title">HABILIDADES PROFESIONALES Y PERSONALES</div>
        <div class="skills-section">
          ${
            data.skills.languages
              ? `<div class="skills-category"><strong>Idiomas:</strong> ${data.skills.languages.join(", ")}</div>`
              : ""
          }
          ${
            data.skills.technical
              ? `<div class="skills-category"><strong>Habilidades Técnicas:</strong> ${data.skills.technical.join(", ")}</div>`
              : ""
          }
          ${
            data.skills.soft
              ? `<div class="skills-category"><strong>Habilidades Blandas:</strong> ${data.skills.soft.join(", ")}</div>`
              : ""
          }
        </div>
      </div>
    `
  }

  return content
}
