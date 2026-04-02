// import { auth } from '@/auth'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
// import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { PostVehicleMenu } from '@/modules/vehicles-types/presentation/components/post-vehicle-menu'
import { PostVehicleMenuComponent } from '@/modules/vehicles-types/presentation/components/post-vehicle-menu/post-vehicle-menu.component'
import { TableVehiclesTypes } from '@/modules/vehicles-types/presentation/components/table-vehicles-types'
import { VehiclesTypesOptionsDropdown } from '@/modules/vehicles-types/presentation/components/vehicles-types-options-dropdown'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { auth } from '@/auth'

interface VehiclesPageProps {
  params: Promise<UrlParams>
}

interface Data {
  title: string
  description: string
  menuPostVehicleTypeTitle: string
  menuPostVehicleTypeDescription: string
  menuPatchVehicleTypeTitle: string
  menuPatchVehicleTypeDescription: string
}

export default async function VehiclesPage({ params }: VehiclesPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  const data: Data = {
    title: MESSAGES_VEHICLES['20.1'],
    description: MESSAGES_VEHICLES['20.2'],
    menuPostVehicleTypeTitle: MESSAGES_VEHICLES['20.4'],
    menuPostVehicleTypeDescription: MESSAGES_VEHICLES['20.5'],
    menuPatchVehicleTypeTitle: MESSAGES_VEHICLES['20.10'],
    menuPatchVehicleTypeDescription: MESSAGES_VEHICLES['20.11']
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <div className="flex gap-5 flex-col lg:flex-row">
        <SectionRedirectLink.Button href={previousSection} />
        <HeaderSection.Root>
          <HeaderSection.Title>{data.title}</HeaderSection.Title>
          <HeaderSection.Description>
            {data.description}
          </HeaderSection.Description>
        </HeaderSection.Root>
      </div>
      <Separator orientation="horizontal" />
      <ActionSection.Root>
        <PostVehicleMenu.Provider>
          <PostVehicleMenu.Trigger />
          <PostVehicleMenuComponent
            title={data.menuPostVehicleTypeTitle}
            description={data.menuPostVehicleTypeDescription}
          />
        </PostVehicleMenu.Provider>
      </ActionSection.Root>
      <TableVehiclesTypes.Root>
        <TableVehiclesTypes.Header />
        <TableVehiclesTypes.Body>
          <TableVehiclesTypes.Item>
            <VehiclesTypesOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
              patchTitle={data.menuPatchVehicleTypeTitle}
              patchDescription={data.menuPatchVehicleTypeDescription}
            />
          </TableVehiclesTypes.Item>
        </TableVehiclesTypes.Body>
      </TableVehiclesTypes.Root>
    </main>
  )
}
