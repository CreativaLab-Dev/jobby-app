interface CVHeaderProps {
  name?: string
}

export function CVHeader({ name }: CVHeaderProps) {
  if (!name) return null

  return (
    <div className="mb-2">
      <h1 className="text-center text-2xl font-bold text-black tracking-wide">{name}</h1>
    </div>
  )
}
