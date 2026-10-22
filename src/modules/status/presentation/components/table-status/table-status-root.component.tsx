'use client'

import type { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableStatusRootComponentProps {
  children?: ReactNode
}

export function TableStatusRootComponent({
  children
}: TableStatusRootComponentProps) {
  return <Table>{children}</Table>
}
