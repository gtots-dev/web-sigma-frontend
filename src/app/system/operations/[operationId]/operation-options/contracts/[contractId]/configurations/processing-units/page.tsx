import { AddProcessingUnitMenu } from '@/modules/processing-units/presentation/components/add-processing-unit-menu'
import { AddProcessingUnitMenuComponent } from '@/modules/processing-units/presentation/components/add-processing-unit-menu/add-processing-unit-menu.component'
import { EditProcessingUnitsMenu } from '@/modules/processing-units/presentation/components/edit-processing-unit-menu'
import { EditProcessingUnitsMenuComponent } from '@/modules/processing-units/presentation/components/edit-processing-unit-menu/edit-processing-unit-menu.component'
import { ProcessingUnitsOptionsDropdown } from '@/modules/processing-units/presentation/components/processing-unit-options-dropdown'
import { PatchProcessingUnitsStatusMenu } from '@/modules/processing-units/presentation/components/patch-processing-unit-status-menu'
import { PatchProcessingUnitsStatusMenuComponent } from '@/modules/processing-units/presentation/components/patch-processing-unit-status-menu/patch-processing-unit-status-menu.component'
import { TabledProcessingUnits } from '@/modules/processing-units/presentation/components/table-processing-units'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface Data {
  title: string
  description: string
  titleAdd: string
  descriptionAdd: string
  titleEdit: string
  descriptionEdit: string
  titlePutStatus: string
  descriptionPutStatus: string
}

interface ProcessingUnitsPageProps {
  params: Promise<UrlParams>
}

export default async function ProcessingUnitsPage({
  params
}: ProcessingUnitsPageProps) {
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
    title: MESSAGES_PROCESSING_UNIT['7.1'],
    description: MESSAGES_PROCESSING_UNIT['7.2'],
    titleAdd: MESSAGES_PROCESSING_UNIT['7.4'],
    descriptionAdd: MESSAGES_PROCESSING_UNIT['7.5'],
    titleEdit: MESSAGES_PROCESSING_UNIT['7.7'],
    descriptionEdit: MESSAGES_PROCESSING_UNIT['7.8'],
    titlePutStatus: MESSAGES_PROCESSING_UNIT['7.9'],
    descriptionPutStatus: MESSAGES_PROCESSING_UNIT['7.10']
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button
          className="mb-5 lg:mb-0"
          href={previousSection}
        />
        <Separator orientation="vertical" className="h-5 hidden lg:block" />
        <HeaderSection.Title>{data.title}</HeaderSection.Title>
        <HeaderSection.Description>
          {data.description}
        </HeaderSection.Description>
      </HeaderSection.Root>

      
      {(isAdmin ||
        userPermissions.has(PermissionEnum.PROCESSING_UNITS_EDIT)) && (
        <ActionSection.Root>
          <AddProcessingUnitMenu.Provider>
            <AddProcessingUnitMenu.Trigger />
            <AddProcessingUnitMenuComponent
              title={data.titleAdd}
              description={data.descriptionAdd}
            />
          </AddProcessingUnitMenu.Provider>
        </ActionSection.Root>
      )}
      <ActionSection.Root>
        <TabledProcessingUnits.Root>
          <TabledProcessingUnits.Header />
          <TabledProcessingUnits.Body>
            <TabledProcessingUnits.Item>
              {((isAdmin ||
                userPermissions.has(PermissionEnum.PROCESSING_UNITS_EDIT)) ||
                (isAdmin ||
                  userPermissions.has(
                    PermissionEnum.PROCESSING_UNITS_ENABLE_AND_DISABLE
                  ))) ? (
                <PatchProcessingUnitsStatusMenu.Provider>
                  <EditProcessingUnitsMenu.Provider>
                    <ProcessingUnitsOptionsDropdown.Root>
                      <ProcessingUnitsOptionsDropdown.Trigger />
                      <ProcessingUnitsOptionsDropdown.Menu>
                        {(isAdmin ||
                          userPermissions.has(
                            PermissionEnum.PROCESSING_UNITS_EDIT
                          )) && (
                          <ProcessingUnitsOptionsDropdown.Item>
                            <EditProcessingUnitsMenu.Trigger />
                          </ProcessingUnitsOptionsDropdown.Item>
                        )}

                        {(isAdmin ||
                          userPermissions.has(
                            PermissionEnum.PROCESSING_UNITS_ENABLE_AND_DISABLE
                          )) && (
                          <ProcessingUnitsOptionsDropdown.Item>
                            <PatchProcessingUnitsStatusMenu.Trigger />
                          </ProcessingUnitsOptionsDropdown.Item>
                        )}
                      </ProcessingUnitsOptionsDropdown.Menu>

                      {(isAdmin ||
                        userPermissions.has(
                          PermissionEnum.PROCESSING_UNITS_EDIT
                        )) && (
                        <EditProcessingUnitsMenuComponent
                          title={data.titleEdit}
                          description={data.descriptionEdit}
                        />
                      )}
                      {(isAdmin ||
                        userPermissions.has(
                          PermissionEnum.PROCESSING_UNITS_ENABLE_AND_DISABLE
                        )) && (
                        <PatchProcessingUnitsStatusMenuComponent
                          title={data.titlePutStatus}
                          description={data.descriptionPutStatus}
                        />
                      )}
                    </ProcessingUnitsOptionsDropdown.Root>
                  </EditProcessingUnitsMenu.Provider>
                </PatchProcessingUnitsStatusMenu.Provider>
              ) : null}
            </TabledProcessingUnits.Item>
          </TabledProcessingUnits.Body>
        </TabledProcessingUnits.Root>
      </ActionSection.Root>
    </main>
  )
}
