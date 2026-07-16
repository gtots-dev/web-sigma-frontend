'use client'

import React, { ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TablePointsRootComponentProps {
  children: ReactNode
}

export function TablePointsRootComponent({
  children
}: TablePointsRootComponentProps) {
  return (
    <section className="flex flex-1 flex-col w-full">
      <Table className="w-full overflow-x-auto">{children}</Table>
    </section>
  )
}
