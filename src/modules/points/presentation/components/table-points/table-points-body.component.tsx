'use client'

import { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import { TablePointContext } from '../../contexts/table-point.context'
import { useTablePoints } from '../../hooks/use-table-points.hook'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'

interface TablePointsBodyComponentProps {
  children: ReactNode
}

export function TablePointsBodyComponent({
  children
}: TablePointsBodyComponentProps) {
  const { points, loading } = useTablePoints()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (points.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_POINT['14.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {points.map((point: PointEntity) => (
        <TablePointContext.Provider key={point.id} value={point}>
          {children}
        </TablePointContext.Provider>
      ))}
    </TableBody>
  )
}
