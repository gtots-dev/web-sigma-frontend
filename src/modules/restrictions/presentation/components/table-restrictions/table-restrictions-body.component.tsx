'use client'

import { type ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'
import { TableRestrictionsProvider } from '../../contexts/table-restrictions.context'
import { useTableRestrictionsHook } from '../../hooks/use-table-restrictions.hook'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

interface TableRestrictionsBodyComponentProps {
  children?: ReactNode
}

export function TableRestrictionsBodyComponent({
  children
}: TableRestrictionsBodyComponentProps) {
  const { restrictions, loading } = useTableRestrictionsHook()
  const colSpan = 4

  if (loading) {
    return (
      <TableBody>
        <TableLoading colSpan={colSpan} />
      </TableBody>
    )
  }

  if (restrictions.length === 0) {
    return (
      <TableBody>
        <TableMessage
          colSpan={colSpan}
          message={MESSAGES_RESTRICTIONS['24.3']}
        />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {restrictions.map((restriction: RestrictionEntity) => (
        <TableRestrictionsProvider
          key={restriction.id || restriction.code}
          value={restriction}
        >
          {children}
        </TableRestrictionsProvider>
      ))}
    </TableBody>
  )
}
