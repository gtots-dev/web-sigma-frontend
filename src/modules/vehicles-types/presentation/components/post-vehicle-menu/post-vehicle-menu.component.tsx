'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostVehicleMenu } from '.'
import { VehicleTypeForm } from '../vehicle-type-form'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import { usePostVehicleTypeSubmit } from '../../hooks/use-post-vehicle-submit.hook'
import { usePostVehicleTypeMenuContext } from '../../contexts/post-vehicle-menu.context'

interface PostVehicleMenuComponentProps {
  title: string
  description: string
}

export function PostVehicleMenuComponent({
  title,
  description
}: PostVehicleMenuComponentProps) {
  const { isOpen, close } = usePostVehicleTypeMenuContext()
  const { onAction } = usePostVehicleTypeSubmit()

  return (
    <PostVehicleMenu.Root isOpen={isOpen} close={close}>
      <PostVehicleMenu.Content>
        <PostVehicleMenu.Header title={title} description={description} />
        <VehicleTypeForm.Form>
          <VehicleTypeForm.Input.Name require />
          <VehicleTypeForm.Input.Code require />
          <VehicleTypeForm.Input.ColorPicker
            name="color"
            label="Cor do veículo"
            require
          />
        </VehicleTypeForm.Form>

        <PostVehicleMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <VehicleTypeForm.Submit<VehicleTypeEntity>
            onSubmit={(vehicle: VehicleTypeEntity) => onAction(vehicle, close)}
          />
        </PostVehicleMenu.Footer>
      </PostVehicleMenu.Content>
    </PostVehicleMenu.Root>
  )
}
