'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchVehicleTypeForm } from '../../hooks/use-patch-vehicle-type-form.hook'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'

interface PatchVehicleTypeMenuRootComponentProps {
  vehicleType: VehicleTypeEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchVehicleTypeMenuRootComponent({
  vehicleType,
  children,
  isOpen,
  close
}: PatchVehicleTypeMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchVehicleTypeForm(vehicleType)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <FormProvider {...methods}>
      <DrawerDialog.Root open={isOpen} onOpenChange={close}>
        {children}
      </DrawerDialog.Root>
    </FormProvider>
  )
}
