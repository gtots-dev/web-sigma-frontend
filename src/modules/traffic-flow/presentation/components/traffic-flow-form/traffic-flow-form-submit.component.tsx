'use client'

import { useFormContext } from 'react-hook-form'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Filter, FilterX } from 'lucide-react'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'

interface TrafficFlowFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function TrafficFlowFormSubmitComponent<T>({
  onSubmit
}: TrafficFlowFormSubmitComponentProps<T>) {
  const { handleSubmit, reset, formState } = useFormContext<TrafficFlowSchemaType>()
  const { isSubmitting } = formState

  const handleReset = () => {
    reset({
      places: { point_ids: [], lane_ids: [], group_ids: [] },
      granularity: 'hour',
      date_range: { start: null, end: null },
      time_range: { start: null, end: null }
    })
  }

  return (
    <div className="flex items-center gap-2.5 w-full lg:w-auto lg:ms-auto">
      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={isSubmitting}
        onClick={handleReset}
        className="flex-1 lg:flex-initial gap-2 font-medium shadow-none hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
        title="Limpar todos os filtros"
      >
        <FilterX className="w-3.5 h-3.5" />
      </Button>

      <Button
        type="button"
        variant="primary"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit as any)}
        className="flex-1 lg:flex-initial gap-2 min-w-[110px] shadow-sm hover:shadow-md transition-all duration-200"
      >
        {!isSubmitting && <Filter className="w-3.5 h-3.5" />}
        <span>Filtrar</span>
        <LoadingSpinComponent loading={!!isSubmitting} />
      </Button>
    </div>
  )
}
