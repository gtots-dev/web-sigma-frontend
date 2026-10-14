'use client'

import type { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableStatusProcessingUnitsRootComponentProps {
  children?: ReactNode
}

export function TableStatusProcessingUnitsRootComponent({
  children
}: TableStatusProcessingUnitsRootComponentProps) {
  return <Table>{children}</Table>
}
