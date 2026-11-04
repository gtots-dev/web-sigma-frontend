import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { VehicleTypeModal } from '@/modules/vehicles-types/presentation/components/vehicle-type-modals'

interface PostVehicleTypeModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostVehicleTypeModalPage({
  params
}: PostVehicleTypeModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.VEHICLE_TYPES_EDIT}
      unauthorizedMessage={MESSAGES_VEHICLES['20.13']}
    >
      <VehicleTypeModal.Post
        title={MESSAGES_VEHICLES['20.4']}
        description={MESSAGES_VEHICLES['20.5']}
      />
    </ModalPermissionGuard>
  )
}
