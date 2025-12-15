'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { useActivityReportSubmit } from '@/modules/activity-report/presentation/hooks/use-activity-submit.hook'
import { useActivityReportStore } from '@/modules/activity-report/presentation/stores/activity-report.store'
import { usePagination } from '../../hooks/use-pagination.hook'
import { Button } from '../shadcn/button'

export function SystemPaginationControlsComponent() {
  const {
    logs: { meta }
  } = useActivityReportStore()

  const { setValue, getValues } = useFormContext<ActivityReportSchemaType>()
  const { handleSubmit } = useActivityReportSubmit()

  const currentPage = meta?.page ?? 1
  const perPage = meta?.per_page ?? 50
  const totalItems = meta?.total_items ?? 0

  const { range, hasNext, hasPrevious } = usePagination({
    currentPage,
    perPage,
    total: totalItems,
    maxPagesToShow: 5
  })

  const goToPage = useCallback(
    (page: number) => {
      setValue('page', page)
      handleSubmit(getValues())
    },
    [getValues, handleSubmit, setValue]
  )

  if (!meta) {
    return (
      <Button
        type="button"
        disabled
        className="dark:disabled:bg-zinc-800/80 disabled:opacity-50 flex items-center justify-center gap-2 w-[297px]"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  return (
    <div className="flex gap-1 items-center">
      <Button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrevious}
        className="dark:disabled:bg-zinc-800/80 dark:disabled:opacity-30 hover:outline outline-1 dark:outline-zinc-800"
      >
        Anterior
      </Button>

      {range.map((page) => (
        <Button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          disabled={page === currentPage}
          size="icon"
          className={`disabled:opacity-80 hover:outline outline-1 dark:outline-zinc-800 ${
            page === currentPage
              ? 'text-white border bg-primary-600'
              : '!text-zinc-700 dark:!text-zinc-100'
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNext}
        className="dark:disabled:bg-zinc-800/80 dark:disabled:opacity-30 hover:outline outline-1 dark:outline-zinc-800"
      >
        Próximo
      </Button>
    </div>
  )
}
