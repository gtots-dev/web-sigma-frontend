interface InfractionsSidebarItemInfoProps {
  plate: string
  time?: string | null
  isSelected: boolean
}

export function InfractionsSidebarItemInfo({
  plate,
  time,
  isSelected,
}: InfractionsSidebarItemInfoProps) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0 px-0.5">
      <span
        className={`
          text-[11px] font-bold font-mono tracking-wide truncate
          ${isSelected ? 'text-primary' : 'text-foreground'}
        `}
      >
        {plate}
      </span>
      {time && (
        <span className="text-[9px] text-muted-foreground font-mono truncate">
          {time}
        </span>
      )}
    </div>
  )
}
