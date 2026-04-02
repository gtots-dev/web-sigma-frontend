'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchVehicleTypeMenu } from '.'
import { usePatchVehicleTypeMenuContext } from '../../contexts/patch-vehicle-type-menu.context'
import { useTableVehiclesTypes } from '../../contexts/table-vehicles-types.context'
import { usePatchVehicleTypeSubmit } from '../../hooks/use-patch-vehicle-type-submit.hook'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import { VehicleTypeForm } from '../vehicle-type-form'

interface PatchVehicleTypeMenuComponentProps {
  title: string
  description: string
}

export function PatchVehicleTypeMenuComponent({
  title,
  description
}: PatchVehicleTypeMenuComponentProps) {
  const { isOpen, close } = usePatchVehicleTypeMenuContext()
  const vehicleType = useTableVehiclesTypes()
  const { onAction } = usePatchVehicleTypeSubmit()

  return (
    <PatchVehicleTypeMenu.Root
      isOpen={isOpen}
      close={close}
      vehicleType={vehicleType}
    >
      <PatchVehicleTypeMenu.Content>
        <PatchVehicleTypeMenu.Header title={title} description={description} />
        <VehicleTypeForm.Form>
          <VehicleTypeForm.Input.Name require />
          <VehicleTypeForm.Input.Code require />
          <VehicleTypeForm.Input.ColorPicker
            name="color"
            label="Cor do veículo"
            require
          />
        </VehicleTypeForm.Form>

        <PatchVehicleTypeMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <VehicleTypeForm.Submit<VehicleTypeEntity>
            onSubmit={(vehicleType: VehicleTypeEntity) =>
              onAction(vehicleType, close)
            }
          />
        </PatchVehicleTypeMenu.Footer>
      </PatchVehicleTypeMenu.Content>
    </PatchVehicleTypeMenu.Root>
  )
}
