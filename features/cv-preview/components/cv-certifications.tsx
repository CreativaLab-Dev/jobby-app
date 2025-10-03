interface CertificationItem {
  name?: string
  issuer?: string
}

interface CVCertificationsProps {
  certifications?: {
    items?: CertificationItem[]
  }
}

export function CVCertifications({ certifications }: CVCertificationsProps) {
  if (!certifications?.items || certifications.items.length === 0) return null

  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">
        LICENCIAS Y CERTIFICACIONES
      </h2>
      <p className="text-sm text-black leading-relaxed text-justify">
        {certifications.items.map((cert) => `${cert.name} - ${cert.issuer}`).join(". ")}
      </p>
    </div>
  )
}
