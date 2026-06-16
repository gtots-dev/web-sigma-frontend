'use client'

import { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { TablePointContext } from '../../contexts/table-point.context'
import { useTablePoints } from '../../hooks/use-table-points.hook'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

interface TablePointsBodyComponentProps {
  children: ReactNode
}

export function TablePointsBodyComponent({
  children
}: TablePointsBodyComponentProps) {
  const { points, loading } = useTablePoints()
  const colSpan = 3

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={colSpan} />
      </TableBody>
    )

  if (points.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={colSpan} message={MESSAGES_POINT['14.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {points.map((point: PointWithGroupInterface) => (
        <TablePointContext.Provider key={point.point.id} value={point}>
          {children}
        </TablePointContext.Provider>
      ))}
    </TableBody>
  )
}
