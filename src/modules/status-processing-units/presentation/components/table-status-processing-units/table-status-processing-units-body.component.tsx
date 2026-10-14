'use client'

import { type ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { TableStatusProcessingUnitsProvider } from '../../contexts/table-status-processing-units.context'
import { useTableStatusProcessingUnitsHook } from '../../hooks/use-table-status-processing-units.hook'
import type { ProcessingUnitStatusInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-status-interface'

interface TableStatusProcessingUnitsBodyComponentProps {
  children?: ReactNode
}

export function TableStatusProcessingUnitsBodyComponent({
  children
}: TableStatusProcessingUnitsBodyComponentProps) {
  const { statusList, loading } = useTableStatusProcessingUnitsHook()
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
          message={MESSAGES_STATUS_PROCESSING_UNITS['25.3']}
        />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {statusList.map((status: ProcessingUnitStatusInterface) => (
        <TableStatusProcessingUnitsProvider
          key={status.id || status.code}
          value={status}
        >
          {children}
        </TableStatusProcessingUnitsProvider>
      ))}
    </TableBody>
  )
}
