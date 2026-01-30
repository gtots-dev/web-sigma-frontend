'use client'

import { ReactNode } from 'react'
// import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/lanes'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { TableLaneContext } from '../../contexts/table-lanes.context'
import { useTableLanes } from '../../hooks/use-table-lanes.hook'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'

interface TableLanesBodyComponentProps {
  children: ReactNode
}

export function TableLanesBodyComponent({
  children
}: TableLanesBodyComponentProps) {
  const { lanes, loading } = useTableLanes()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (lanes?.length === 0 || lanes == null)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_LANE['8.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {lanes.map((lane: LaneEntity) => (
        <TableLaneContext.Provider key={lane.id} value={lane}>
          {children}
        </TableLaneContext.Provider>
      ))}
    </TableBody>
  )
}
