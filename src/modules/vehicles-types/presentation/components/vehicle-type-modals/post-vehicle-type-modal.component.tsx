'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { VehicleTypeForm } from '../vehicle-type-form'
import { usePostVehicleTypeForm } from '../../hooks/use-post-vehicle-form.hook'
import { usePostVehicleTypeSubmit } from '../../hooks/use-post-vehicle-submit.hook'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'

export interface PostVehicleTypeModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostVehicleTypeModal({
  title,
  description,
  onClose,
  onReturn
}: PostVehicleTypeModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = usePostVehicleTypeForm()
  const { onAction } = usePostVehicleTypeSubmit()

  const handleSubmit = (vehicleType: VehicleTypeEntity) =>
    onAction(vehicleType, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <VehicleTypeForm.Form>
            <VehicleTypeForm.Input.Name require />
            <VehicleTypeForm.Input.Code require />
            <VehicleTypeForm.Input.ColorPicker
              name="color"
              label="Cor do veículo"
              require
            />
          </VehicleTypeForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <VehicleTypeForm.Submit<VehicleTypeEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
