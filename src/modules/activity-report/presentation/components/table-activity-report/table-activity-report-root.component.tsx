'use client'

import React, { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableActivityReportRootComponentProps {
  children: ReactNode
}

export function TableActivityReportRootComponent({
  children
}: TableActivityReportRootComponentProps) {
  return (
    <section className="flex flex-1 flex-col w-full overflow-x-auto">
      <Table className="table-fixed w-full">{children}</Table>
    </section>
  )
}
