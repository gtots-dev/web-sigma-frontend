import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { VehicleTypeModal } from '@/modules/vehicles-types/presentation/components/vehicle-type-modals'

interface PatchVehicleTypeModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    vehicleTypeId: string
  }>
}

export default async function PatchVehicleTypeModalPage({
  params
}: PatchVehicleTypeModalPageProps) {
  const { operationId, vehicleTypeId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.VEHICLE_TYPES_EDIT}
      unauthorizedMessage={MESSAGES_VEHICLES['20.13']}
    >
      <VehicleTypeModal.Patch
        title={MESSAGES_VEHICLES['20.10']}
        description={MESSAGES_VEHICLES['20.11']}
        vehicleTypeId={Number(vehicleTypeId)}
      />
    </ModalPermissionGuard>
  )
}
