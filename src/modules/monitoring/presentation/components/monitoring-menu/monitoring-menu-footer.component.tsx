'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringMenuFooter() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <p className="text-[9px] text-muted-foreground/70">
        Clique novamente para fechar
      </p>
      <Button size="sm" variant="outline" className="h-7 text-[10px] px-3">
        Ver Mais
      </Button>
    </div>
  )
}
