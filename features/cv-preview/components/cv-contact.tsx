interface CVContactProps {
  personal?: {
    address?: string
    linkedin?: string
    phone?: string
    email?: string
  }
}

export function CVContact({ personal }: CVContactProps) {
  if (!personal) return null

  return (
    <div className="mb-4">
      <p className="text-[14px] text-black text-center leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
        {personal.address && <span>{personal.address}</span>}
        {personal.address && (personal.linkedin || personal.phone || personal.email) && <span> • </span>}
        {personal.linkedin && (
          <a 
            href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            {personal.linkedin}
          </a>
        )}
        {personal.linkedin && (personal.phone || personal.email) && <span> • </span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.phone && personal.email && <span> • </span>}
        {personal.email && <span>{personal.email}</span>}
      </p>
      <hr className="border-black mt-2" />
    </div>
  )
}
