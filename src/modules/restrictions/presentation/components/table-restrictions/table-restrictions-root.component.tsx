'use client'

import type { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableRestrictionsRootComponentProps {
  children?: ReactNode
}

export function TableRestrictionsRootComponent({
  children
}: TableRestrictionsRootComponentProps) {
  return <Table>{children}</Table>
}
