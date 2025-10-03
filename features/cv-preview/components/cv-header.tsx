interface CVHeaderProps {
  name?: string
}

export function CVHeader({ name }: CVHeaderProps) {
  if (!name) return null

  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold text-black mb-6 tracking-wide uppercase">{name}</h1>
    </div>
  )
}
