'use client'

import { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { useTableProcessingUnits } from '../../hooks/use-table-processing-units.hook'
import { TableProcessingUnitsContext } from '../../contexts/table-processing-units.context'

interface TabledProcessingUnitsBodyComponentProps {
  children: ReactNode
}

export function TabledProcessingUnitsBodyComponent({
  children
}: TabledProcessingUnitsBodyComponentProps) {
  const { processingUnits, loading } = useTableProcessingUnits()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={5} />
      </TableBody>
    )

  if (processingUnits.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={5} message={MESSAGES_PROCESSING_UNIT['3.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {processingUnits.map((processingUnit: ProcessingUnitEntity) => (
        <TableProcessingUnitsContext.Provider
          key={processingUnit.id}
          value={processingUnit}
        >
          {children}
        </TableProcessingUnitsContext.Provider>
      ))}
    </TableBody>
  )
}
