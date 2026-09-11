interface InfractionDescriptionListItemProps {
  label: string
  value?: string | null
  mono?: boolean
}

export function InfractionDescriptionListItem({
  label,
  value,
  mono,
}: InfractionDescriptionListItemProps) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground truncate">
        {label}
      </span>
      <span
        className={`text-[13px] font-semibold text-foreground truncate ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}

