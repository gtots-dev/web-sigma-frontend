'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'
import { useActivityReportSubmit } from '../../hooks/use-activity-submit.hook'
import type { ActivityReportSchemaType } from '../../hooks/use-activity-schema.hook'
import { Search } from 'lucide-react'
import type { ReactNode } from 'react'

interface ActivityReportFormSubmitComponentProps {
  className?: string
  children?: ReactNode
}

export function ActivityReportFormSubmitComponent({
  className,
  children
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
      {!children ? <Search /> : children}
    </Button>
  )
}
