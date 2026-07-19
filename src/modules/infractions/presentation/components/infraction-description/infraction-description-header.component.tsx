interface InfractionDescriptionHeaderProps {
  id: number
  laneId: number | string
}

export function InfractionDescriptionHeader({ id, laneId }: InfractionDescriptionHeaderProps) {
  return (
    <div className="px-4 py-3 border-b shrink-0">
      <span className="text-[9px] font-mono text-muted-foreground/60">
        #{id} · Faixa {laneId}
      </span>
    </div>
  )
}
