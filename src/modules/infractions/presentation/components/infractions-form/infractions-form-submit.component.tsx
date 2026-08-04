'use client'

import { useFormContext } from 'react-hook-form'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Filter, FilterX } from 'lucide-react'
import type { InfractionsFiltersInterface } from '@/modules/infractions/domain/interfaces/infractions-filters.interface'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'

interface InfractionsFormSubmitProps {
  onSubmit: (filters: InfractionsFiltersInterface) => void
  loading?: boolean
}

export function InfractionsFormSubmitComponent({
  onSubmit,
  loading
}: InfractionsFormSubmitProps) {
  const { handleSubmit, reset } = useFormContext<InfractionsFiltersSchemaType>()

  const handleFormSubmit = () => {
    handleSubmit((values) => {
      const filters: InfractionsFiltersInterface = {
        places: values.places ?? {
          lane_ids: [],
          point_ids: [],
          group_ids: []
        },
        date_range: values.date_range ?? {
          start: '',
          end: ''
        },
        time_range: values.time_range ?? {
          start: '',
          end: ''
        },
        violation_id: values.violation_id ?? [],
        restriction_id: values.restriction_id ?? []
      }
      onSubmit(filters)
    })()
  }

  const handleReset = () => {
    reset({
      places: { point_ids: [], lane_ids: [], group_ids: [] },
      date_range: { start: '', end: '' },
      time_range: { start: '', end: '' },
      violation_id: [],
      restriction_id: []
    })
    onSubmit({})
  }

  return (
    <div className="flex items-center gap-2.5 w-full lg:w-auto lg:ms-auto">
      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={loading}
        onClick={handleReset}
        className="flex-1 lg:flex-initial gap-2 font-medium shadow-none hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
        title="Limpar todos os filtros"
      >
        <FilterX className="w-3.5 h-3.5" />
      </Button>

      <Button
        type="button"
        variant="primary"
        disabled={loading}
        onClick={handleFormSubmit}
        className="flex-1 lg:flex-initial gap-2 min-w-[110px] shadow-sm hover:shadow-md transition-all duration-200"
      >
        {!loading && <Filter className="w-3.5 h-3.5" />}
        <span>Filtrar</span>
        <LoadingSpinComponent loading={!!loading} />
      </Button>
    </div>
  )
}
