'use client'

import { type ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { TableStatusLanesProvider } from '../../contexts/table-status-lanes.context'
import { useTableStatusLanesHook } from '../../hooks/use-table-status-lanes.hook'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'

interface TableStatusLanesBodyComponentProps {
  children?: ReactNode
}

export function TableStatusLanesBodyComponent({
  children
}: TableStatusLanesBodyComponentProps) {
  const { statusList, loading } = useTableStatusLanesHook()
  const colSpan = 3

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
          message={MESSAGES_STATUS_LANES['26.3']}
        />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {statusList.map((status: LaneStatusInterface) => (
        <TableStatusLanesProvider
          key={status.id || status.code}
          value={status}
        >
          {children}
        </TableStatusLanesProvider>
      ))}
    </TableBody>
  )
}
