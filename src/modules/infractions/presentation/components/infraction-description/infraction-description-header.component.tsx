interface InfractionDescriptionHeaderProps {
  id: number | string
  laneId: number | string
}

export function InfractionDescriptionHeader({
  id,
  laneId
}: InfractionDescriptionHeaderProps) {
  return (
    <div className="px-4 py-3 border-b shrink-0 flex items-center justify-between bg-card/80 backdrop-blur-xs">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-primary-500/15 text-primary-500 border border-primary-500/30">
          Faixa {laneId}
        </span>
      </div>

      <span className="text-[9.5px] font-mono text-muted-foreground/80">
        ID: #{id}
      </span>
    </div>
  )
}
