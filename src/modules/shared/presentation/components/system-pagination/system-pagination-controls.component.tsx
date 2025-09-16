'use client'

import { useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { useActivityReportSubmit } from '@/modules/activity-report/presentation/hooks/use-activity-submit.hook'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { Button } from '../shadcn/button'
import { useActivityReportStore } from '@/modules/activity-report/presentation/stores/activity-report.store'
import { usePagination } from '../../hooks/use-pagination.hook'
import { Loader2 } from 'lucide-react'

export function SystemPaginationControlsComponent() {
  const {
    logs: { meta }
  } = useActivityReportStore()

  const { setValue, getValues } = useFormContext<ActivityReportSchemaType>()
  const { handleSubmit } = useActivityReportSubmit()

  const goToPage = useCallback(
    (page: number) => {
      setValue('page', page)
      handleSubmit(getValues())
    },
    [getValues, handleSubmit, setValue]
  )

  if (!meta) {
    return (
      <>
        {[''].map((label, idx) => (
          <Button
            key={idx}
            type="button"
            disabled
            className="dark:disabled:bg-zinc-800/80 disabled:opacity-50  dark:disabled:opacity-50 flex items-center justify-center gap-2 w-[297px]"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ))}
      </>
    )
  }

  const { page, per_page, total_pages } = meta
  const { range, currentPage, hasNext, hasPrevious } = usePagination({
    currentPage: page,
    perPage: per_page,
    total: total_pages,
    maxPagesToShow: total_pages
  })

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
