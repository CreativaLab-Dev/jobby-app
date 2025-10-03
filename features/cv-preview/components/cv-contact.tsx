interface CVContactProps {
  personal?: {
    phone?: string
    email?: string
  }
}

export function CVContact({ personal }: CVContactProps) {
  if (!personal) return null

  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-black mb-4 uppercase border-b border-black pb-1">CONTACTO</h2>
      <p className="text-sm text-black">
        {personal.phone} - {personal.email}
      </p>
    </div>
  )
}
