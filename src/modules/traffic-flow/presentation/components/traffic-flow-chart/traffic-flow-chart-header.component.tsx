'use client'

import {
  CardHeader,
  CardTitle,
  CardDescription
} from '@/modules/shared/presentation/components/shadcn/card'
import type { ReactNode } from 'react'

export function TrafficFlowChartHeader({
  title,
  description,
  children
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <CardHeader className="flex flex-row justify-between border-b">
      <div className="flex flex-col gap-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {children && (
        <div className="flex justify-end items-center">{children}</div>
      )}
    </CardHeader>
  )
}
