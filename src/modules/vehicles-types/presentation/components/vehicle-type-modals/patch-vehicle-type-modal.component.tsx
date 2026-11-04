'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { VehicleTypeForm } from '../vehicle-type-form'
import { usePatchVehicleTypeForm } from '../../hooks/use-patch-vehicle-type-form.hook'
import { usePatchVehicleTypeSubmit } from '../../hooks/use-patch-vehicle-type-submit.hook'
import { useVehicleTypeById } from '../../hooks/use-vehicle-type-by-id.hook'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'

export interface PatchVehicleTypeModalProps {
  title: string
  description: string
  vehicleTypeId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchVehicleTypeFormBodyProps {
  title: string
  description: string
  vehicleType: VehicleTypeEntity
  onClose: () => void
}

function PatchVehicleTypeFormBody({
  title,
  description,
  vehicleType,
  onClose
}: PatchVehicleTypeFormBodyProps) {
  const { methods } = usePatchVehicleTypeForm(vehicleType)
  const { onAction } = usePatchVehicleTypeSubmit(Number(vehicleType.id))

  const handleSubmit = (data: VehicleTypeEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
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
            onClick={onClose}
          >
            Cancelar
          </Button>
          <VehicleTypeForm.Submit<VehicleTypeEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchVehicleTypeModal({
  title,
  description,
  vehicleTypeId,
  onClose,
  onReturn
}: PatchVehicleTypeModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { vehicleType, loading } = useVehicleTypeById(vehicleTypeId)

  if (!loading && !vehicleType) {
    return (
      <ModalShell.Empty
        title="Tipo de veículo não encontrado"
        description={`O tipo de veículo solicitado com o ID ${vehicleTypeId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {vehicleType && (
        <PatchVehicleTypeFormBody
          title={title}
          description={description}
          vehicleType={vehicleType}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
