interface InfractionsSidebarHeaderProps {
  count: number
}

export function InfractionsSidebarHeader({ count }: InfractionsSidebarHeaderProps) {
  return (
    <div className="px-3 py-2.5 border-b shrink-0">
      <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
        Registros
      </span>
      <span className="ml-2 text-[9px] font-mono text-muted-foreground/60">
        ({count})
      </span>
    </div>
  )
}
