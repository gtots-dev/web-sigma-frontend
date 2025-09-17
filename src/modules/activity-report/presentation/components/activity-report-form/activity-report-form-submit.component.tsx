'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'
import { useActivityReportSubmit } from '../../hooks/use-activity-submit.hook'
import type { ActivityReportSchemaType } from '../../hooks/use-activity-schema.hook'
import { Search } from 'lucide-react'

interface ActivityReportFormSubmitComponentProps {
  className?: string
}

export function ActivityReportFormSubmitComponent({
  className
}: ActivityReportFormSubmitComponentProps) {
  const { handleSubmit } = useFormContext<ActivityReportSchemaType>()
  const { handleSubmit: onSubmit } = useActivityReportSubmit()

  return (
    <Button
      className={className}
      variant="primary"
      size="icon"
      onClick={handleSubmit(onSubmit)}
    >
      <Search />
    </Button>
  )
}
