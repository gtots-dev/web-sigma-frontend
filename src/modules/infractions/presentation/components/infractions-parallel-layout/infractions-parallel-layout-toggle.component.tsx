'use client'

import { useInfractionsParallelLayoutContext } from '@/modules/infractions/presentation/contexts/infractions-parallel-layout.context'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LayoutGrid, Radio } from 'lucide-react'

export function InfractionsParallelLayoutToggleComponent() {
  const { viewMode, handleViewChange } = useInfractionsParallelLayoutContext()

  return (
    <div className="inline-flex items-center p-1 rounded-lg bg-muted/60 border border-border/50 gap-1 ml-auto shrink-0 mt-3 lg:mt-0">
      <Button
        variant="outline"
        type="button"
        onClick={() => handleViewChange('records')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
          viewMode === 'records' &&
          'bg-primary-600 !text-white hover:bg-primary-500'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Registros
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => handleViewChange('live')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
          viewMode === 'live' &&
          'bg-primary-600 !text-white hover:bg-primary-500'
        }`}
      >
        <Radio className={'w-3.5 h-3.5'} />
        Ao Vivo
      </Button>
    </div>
  )
}
