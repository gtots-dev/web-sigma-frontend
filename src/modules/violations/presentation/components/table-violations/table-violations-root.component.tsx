'use client'

import type { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableViolationsRootComponentProps {
  children?: ReactNode
}

export function TableViolationsRootComponent({
  children
}: TableViolationsRootComponentProps) {
  return <Table>{children}</Table>
}
