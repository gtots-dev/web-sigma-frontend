'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Filter, RotateCcw } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useActivityReportSubmit } from '../../hooks/use-activity-submit.hook'
import type { ActivityReportSchemaType } from '../../hooks/use-activity-schema.hook'
import { subMonths } from 'date-fns'
import { formatDateOnly } from '@/modules/shared/presentation/utils/formatted.utils'

interface ActivityReportFormSubmitComponentProps {
  className?: string
  children?: React.ReactNode
}

export function ActivityReportFormSubmitComponent({
  className
}: ActivityReportFormSubmitComponentProps) {
  const { handleSubmit, reset, formState } =
    useFormContext<ActivityReportSchemaType>()
  const { isSubmitting } = formState
  const { handleSubmit: onSubmit } = useActivityReportSubmit()

  const handleReset = () => {
    const today = new Date()
    const oneMonthAgo = subMonths(today, 1)
    reset({
      actions: '',
      contract_ids: [],
      user_ids: [],
      date_range: {
        start: formatDateOnly(oneMonthAgo),
        end: formatDateOnly(today)
      },
      time_range: {
        start: null,
        end: null
      }
    })
    handleSubmit(onSubmit)()
  }

  return (
    <div
      className={`flex items-center gap-2.5 w-full lg:w-auto lg:ms-auto ${className ?? ''}`}
    >
      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={isSubmitting}
        onClick={handleReset}
        className="flex-1 lg:flex-initial gap-2 font-medium shadow-none hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
        title="Limpar todos os filtros"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </Button>

      <Button
        type="button"
        variant="primary"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className="flex-1 lg:flex-initial gap-2 min-w-[110px] shadow-sm hover:shadow-md transition-all duration-200"
      >
        {!isSubmitting && <Filter className="w-3.5 h-3.5" />}
        <span>Filtrar</span>
        <LoadingSpinComponent loading={!!isSubmitting} />
      </Button>
    </div>
  )
}
