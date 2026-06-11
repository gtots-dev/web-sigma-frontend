'use client'

import React, { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableGroupsRootComponentProps {
  children: ReactNode
}

export function TableGroupsRootComponent({
  children
}: TableGroupsRootComponentProps) {
  return (
    <section className="flex flex-1 flex-col w-full">
      <Table className="w-full overflow-x-auto">{children}</Table>
    </section>
  )
}
