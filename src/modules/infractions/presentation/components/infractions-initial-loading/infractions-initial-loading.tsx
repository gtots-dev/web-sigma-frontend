'use client'

import { LoaderCircle } from 'lucide-react'
import { MESSAGES_INFRACTIONS } from '@/modules/shared/presentation/messages/infractions'

export function InfractionsInitialLoading() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] w-full gap-6 py-12 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping [animation-duration:1.5s]" />
        <div className="absolute w-14 h-14 rounded-full border border-primary/20 animate-pulse duration-1000" />

        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-md border-muted">
          <LoaderCircle className="h-5 w-5 text-primary animate-spin [animation-duration:1s]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center px-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
          {MESSAGES_INFRACTIONS['22.1']}
        </span>
        <p className="text-sm font-semibold text-muted-foreground animate-pulse duration-1000">
          {MESSAGES_INFRACTIONS['22.6']}
        </p>
      </div>
    </div>
  )
}
