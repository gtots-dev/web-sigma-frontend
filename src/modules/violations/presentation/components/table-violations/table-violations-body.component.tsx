'use client'

import { type ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { MESSAGES_VIOLATIONS } from '@/modules/shared/presentation/messages/violations'
import { TableViolationsProvider } from '../../contexts/table-violations.context'
import { useTableViolationsHook } from '../../hooks/use-table-violations.hook'
import type { ViolationEntity } from '@/modules/violations/domain/entities/violation.entity'

interface TableViolationsBodyComponentProps {
  children?: ReactNode
}

export function TableViolationsBodyComponent({
  children
}: TableViolationsBodyComponentProps) {
  const { violations, loading } = useTableViolationsHook()
  const colSpan = 4

  if (loading) {
    return (
      <TableBody>
        <TableLoading colSpan={colSpan} />
      </TableBody>
    )
  }

  if (violations.length === 0) {
    return (
      <TableBody>
        <TableMessage colSpan={colSpan} message={MESSAGES_VIOLATIONS['23.3']} />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {violations.map((violation: ViolationEntity) => (
        <TableViolationsProvider
          key={violation.id || violation.code}
          value={violation}
        >
          {children}
        </TableViolationsProvider>
      ))}
    </TableBody>
  )
}
