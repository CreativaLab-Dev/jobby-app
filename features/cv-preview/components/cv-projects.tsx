interface ProjectItem {
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
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">PROYECTOS ACADÉMICOS</h2>
      {projects.items.map((project, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-black">{project.title}</h3>
            <span className="text-sm text-black whitespace-nowrap ml-4">{project.duration}</span>
          </div>
          <p className="text-sm text-black leading-relaxed text-justify mb-2">{project.description}</p>
          {project.technologies && (
            <p className="text-sm text-black">
              <strong>Tecnologías:</strong> {project.technologies}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
