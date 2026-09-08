interface InfractionsSidebarItemInfoProps {
  title?: string
  subtitle?: string | null
  time?: string | null
  isSelected: boolean
  isViewed?: boolean
  expiresAt?: number
}

export function InfractionsSidebarItemInfo({
  title,
  subtitle,
  time,
  isSelected,
  isViewed = true
}: InfractionsSidebarItemInfoProps) {
  return (
    <div className="flex flex-col justify-center min-w-0 flex-1 gap-0.5">
      <div className="flex items-center justify-between gap-1.5 w-full">
        {title && (
          <span
            className={`
              text-[11px] font-bold font-mono tracking-tight truncate
              ${
                isSelected || !isViewed
                  ? 'text-primary-500 font-black'
                  : 'text-foreground/90'
              }
            `}
          >
            {title}
          </span>
        )}

        {!isViewed && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider bg-primary-500/15 text-primary-500 border border-primary-500/30 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
            Novo
          </span>
        )}
      </div>

      {/* Linha 2: Subtítulo (Tipo de Arquivo / Descrição) */}
      {subtitle && (
        <span className="text-[9.5px] font-medium text-muted-foreground/90 truncate capitalize">
          {subtitle}
        </span>
      )}

      <div className="flex items-center justify-between gap-1 w-full mt-0.5">
        {time && (
          <span className="text-[9px] text-muted-foreground/75 font-mono truncate flex items-center gap-1">
            {time}
          </span>
        )}
      </div>
    </div>
  )
}
