'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostVehicleMenu } from '.'
import { VehicleForm } from '../vehicle-form'
import type { VehicleEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import { usePostVehicleSubmit } from '../../hooks/use-post-vehicle-submit.hook'
import { usePostVehicleMenuContext } from '../../contexts/post-vehicle-menu.context'

interface PostVehicleMenuComponentProps {
  title: string
  description: string
}

export function PostVehicleMenuComponent({
  title,
  description
}: PostVehicleMenuComponentProps) {
  const { isOpen, close } = usePostVehicleMenuContext()
  const { onAction } = usePostVehicleSubmit()

  return (
    <PostVehicleMenu.Root isOpen={isOpen} close={close}>
      <PostVehicleMenu.Content>
        <PostVehicleMenu.Header title={title} description={description} />
        <VehicleForm.Form>
          <VehicleForm.Input.Name require />
          <VehicleForm.Input.Code />
          <VehicleForm.Input.ColorPicker
            name="color"
            label="Cor do veículo"
            require
          />
        </VehicleForm.Form>

        <PostVehicleMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <VehicleForm.Submit<VehicleEntity>
            onSubmit={(vehicle: VehicleEntity) => onAction(vehicle, close)}
          />
        </PostVehicleMenu.Footer>
      </PostVehicleMenu.Content>
    </PostVehicleMenu.Root>
  )
}
