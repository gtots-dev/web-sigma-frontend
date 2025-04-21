import React, { type ReactNode } from 'react'
import { Table } from '@/modules/shared/presentation/components/shadcn/table'

interface TableUsersRootComponentProps {
  children: ReactNode
}

export async function TableUsersRootComponent({
  children
}: TableUsersRootComponentProps) {
  const containerHeight = 69 + 36 + 53 * 10
  return (
    <section
      style={{ height: `${containerHeight}px` }}
      className="flex flex-col w-full"
    >
      <Table className="w-full overflow-x-hidden">{children}</Table>
    </section>
  )
}
