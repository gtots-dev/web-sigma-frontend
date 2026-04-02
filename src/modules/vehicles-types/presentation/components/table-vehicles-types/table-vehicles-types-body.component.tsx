'use client'

import { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { TableVehiclesTypesContext } from '../../contexts/table-vehicles-types.context'
import { useTableVehiclesTypes } from '../../hooks/use-table-vehicles-types.hook'

interface TableVehiclesTypesBodyComponentProps {
  children: ReactNode
}

export function TableVehiclesTypesBodyComponent({
  children
}: TableVehiclesTypesBodyComponentProps) {
  const { vehiclesTypes, loading } = useTableVehiclesTypes()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (vehiclesTypes.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_VEHICLES['20.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {vehiclesTypes.map((vehicleType: VehicleTypeEntity) => (
        <TableVehiclesTypesContext.Provider
          key={vehicleType.id}
          value={vehicleType}
        >
          {children}
        </TableVehiclesTypesContext.Provider>
      ))}
    </TableBody>
  )
}
