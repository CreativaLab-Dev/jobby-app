interface CertificationItem {
  id: string
  name?: string
  issuer?: string
  date?: string
}

interface CVCertificationsProps {
  certifications?: {
    items?: CertificationItem[]
  }
}

export function CVCertifications({ certifications }: CVCertificationsProps) {
  if (!certifications?.items || certifications.items.length === 0) return null

  return (
    <div className="mb-2">
      <h2 className="text-[16px] font-bold text-black mb-2 uppercase border-b border-black">
        LICENCIAS Y CERTIFICACIONES
      </h2>
      <div className="text-[15px] text-black leading-relaxed text-justify">
        {certifications.items.map((cert, index) => (
          <div key={cert.id || index} className="line-clamp-1">
            {cert.name} by {cert.issuer} {cert.date && `(${new Date(cert.date).toLocaleDateString("en-US", { year: "numeric" })})`}
          </div>
        ))}
      </div>
    </div>
  )
}
