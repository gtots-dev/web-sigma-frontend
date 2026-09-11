'use client'

import { Timer } from 'lucide-react'
import { useInfractionLifespanTimer } from '@/modules/infractions/presentation/hooks/use-infraction-lifespan-timer.hook'

interface InfractionLifespanTimerProps {
  expiresAt?: number
  className?: string
}

export function InfractionLifespanTimer({
  expiresAt,
  className = ''
}: InfractionLifespanTimerProps) {
  const { timeLeftSec, formatted, isCritical, isWarning } =
    useInfractionLifespanTimer(expiresAt)

  if (timeLeftSec === null) return null

  return (
    <div
      className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full font-mono font-bold border transition-colors ${
        isCritical
          ? 'bg-destructive/20 text-destructive border-destructive/40 animate-pulse'
          : isWarning
            ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
            : 'bg-primary-500/15 text-primary-200 border-primary-500/30'
      } ${className}`}
      title={`Tempo restante de vida útil: ${formatted}`}
    >
      <Timer className="w-2.5 h-2.5 shrink-0" />
      <span className="leading-[2px] text-[9px] text-center ">{formatted}</span>
    </div>
  )
}
