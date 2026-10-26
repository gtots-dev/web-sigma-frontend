'use client'

import { type ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { TableStatusProvider } from '../../contexts/table-status.context'
import { useTableStatusHook } from '../../hooks/use-table-status.hook'
import type { StatusItemInterface } from '@/modules/status/domain/interfaces/status-item.interface'

interface TableStatusBodyComponentProps {
  children?: ReactNode
}

export function TableStatusBodyComponent({
  children
}: TableStatusBodyComponentProps) {
  const { statusList, loading } = useTableStatusHook()
  const colSpan = 3 // 4 quando a coluna Status estiver ativa

  if (loading) {
    return (
      <TableBody>
        <TableLoading colSpan={colSpan} />
      </TableBody>
    )
  }

  if (statusList.length === 0) {
    return (
      <TableBody>
        <TableMessage
          colSpan={colSpan}
          message="Nenhum status encontrado para este contrato."
        />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {statusList.map((status: StatusItemInterface) => (
        <TableStatusProvider
          key={`${status.origin}-${status.id}`}
          value={status}
        >
          {children}
        </TableStatusProvider>
      ))}
    </TableBody>
  )
}
