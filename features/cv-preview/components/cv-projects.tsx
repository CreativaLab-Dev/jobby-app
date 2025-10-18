interface ProjectItem {
  id: string
  title?: string
  duration?: string
  description?: string
  technologies?: string
}

interface CVProjectsProps {
  projects?: {
    items?: ProjectItem[]
  }
}

export function CVProjects({ projects }: CVProjectsProps) {
  if (!projects?.items || projects.items.length === 0) return null

  return (
    <div className="mb-2">
      <h2 className="text-[16px] font-bold text-black mb-3 uppercase border-b border-black">
        PROYECTOS ACADÉMICOS
      </h2>
      {projects.items.map((project) => (
        <div key={project.id} className="mb-3">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-bold text-black">{project.title}</h3>
            <span className="text-[15px] text-black whitespace-nowrap ml-2">{project.duration}</span>
          </div>
          <p className="text-[15px] text-black leading-relaxed text-justify mb-1">{project.description}</p>
          {project.technologies && (
            <p className="text-[15px] text-black">
              <strong>Tecnologías:</strong> {project.technologies}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
