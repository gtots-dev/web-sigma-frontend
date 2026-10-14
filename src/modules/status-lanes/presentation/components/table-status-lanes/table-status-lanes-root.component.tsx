'use client'

import type { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableStatusLanesRootComponentProps {
  children?: ReactNode
}

export function TableStatusLanesRootComponent({
  children
}: TableStatusLanesRootComponentProps) {
  return <Table>{children}</Table>
}
