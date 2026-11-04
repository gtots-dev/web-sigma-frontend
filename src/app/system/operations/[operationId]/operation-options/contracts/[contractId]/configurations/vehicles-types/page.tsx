import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { TableVehiclesTypes } from '@/modules/vehicles-types/presentation/components/table-vehicles-types'
import { VehiclesTypesOptionsDropdown } from '@/modules/vehicles-types/presentation/components/vehicles-types-options-dropdown'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { VehicleTypeModalTrigger } from '@/modules/vehicles-types/presentation/components/vehicle-type-modal-triggers'

interface VehiclesPageProps {
  params: Promise<UrlParams>
}

export default async function VehiclesPage({ params }: VehiclesPageProps) {
  const { operationId: rawOperationId, contractId: rawContractId } =
    await params
  const { isAdmin, userPermissions, hasPermission } =
    await getOperationAuthContext(rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_VEHICLES['20.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_VEHICLES['20.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.VEHICLE_TYPES_EDIT) && (
        <ActionSection.Root>
          <VehicleTypeModalTrigger.Post />
        </ActionSection.Root>
      )}
      <TableVehiclesTypes.Root>
        <TableVehiclesTypes.Header />
        <TableVehiclesTypes.Body>
          <TableVehiclesTypes.Item>
            <VehiclesTypesOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TableVehiclesTypes.Item>
        </TableVehiclesTypes.Body>
      </TableVehiclesTypes.Root>
    </main>
  )
}
