import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { TableLanes } from '@/modules/lanes/presentation/components/table-lanes'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { AddLaneMenu } from '@/modules/lanes/presentation/components/add-lane-menu'
import { AddLaneMenuComponent } from '@/modules/lanes/presentation/components/add-lane-menu/add-lane-menu.component'
import { EditLaneMenu } from '@/modules/lanes/presentation/components/edit-lane-menu'
import { LaneOptionsDropdown } from '@/modules/lanes/presentation/components/lane-options-dropdown'
import { EditLaneMenuComponent } from '@/modules/lanes/presentation/components/edit-lane-menu/edit-lane-menu.component'
import { PatchLaneStatusMenu } from '@/modules/lanes/presentation/components/patch-lane-menu'
import { PatchLaneStatusMenuComponent } from '@/modules/lanes/presentation/components/patch-lane-menu/patch-lane-status-menu.component'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

interface LanesPageProps {
  params: Promise<UrlParams>
}

interface Data {
  title: string
  description: string
  menuAddLaneTitle: string
  menuAddLaneDescription: string
  menuEditLaneTitle: string
  menuEditLaneDescription: string
  menuPatchLaneStatusTitle: string
  menuPatchLaneStatusDescription: string
}

export default async function LanesPage({ params }: LanesPageProps) {
  const [{ operationId: rawOperationId, contractId: rawContractId }] =
    await Promise.all([params])

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations/processing-units`

  const data: Data = {
    title: MESSAGES_LANE[8.1],
    description: MESSAGES_LANE['8.2'],
    menuAddLaneTitle: MESSAGES_LANE['8.4'],
    menuAddLaneDescription: MESSAGES_LANE['8.5'],
    menuEditLaneTitle: MESSAGES_LANE['8.7'],
    menuEditLaneDescription: MESSAGES_LANE['8.8'],
    menuPatchLaneStatusTitle: MESSAGES_LANE['8.9'],
    menuPatchLaneStatusDescription: MESSAGES_LANE['8.10']
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
        <AddLaneMenu.Provider>
          <AddLaneMenu.Trigger />
          <AddLaneMenuComponent
            title={data.menuAddLaneTitle}
            description={data.menuAddLaneDescription}
          />
        </AddLaneMenu.Provider>
      </ActionSection.Root>
      <TableLanes.Root>
        <TableLanes.Header />
        <TableLanes.Body>
          <TableLanes.Item>
            <PatchLaneStatusMenu.Provider>
              <EditLaneMenu.Provider>
                <LaneOptionsDropdown.Root>
                  <LaneOptionsDropdown.Trigger />
                  <LaneOptionsDropdown.Menu>
                    <LaneOptionsDropdown.Item>
                      <EditLaneMenu.Trigger />
                    </LaneOptionsDropdown.Item>

                    <LaneOptionsDropdown.Item>
                      <PatchLaneStatusMenu.Trigger />
                    </LaneOptionsDropdown.Item>
                  </LaneOptionsDropdown.Menu>
                  <EditLaneMenuComponent
                    title={data.menuEditLaneTitle}
                    description={data.menuEditLaneDescription}
                  />

                  <PatchLaneStatusMenuComponent
                    title={data.menuPatchLaneStatusTitle}
                    description={data.menuPatchLaneStatusDescription}
                  />
                </LaneOptionsDropdown.Root>
              </EditLaneMenu.Provider>
            </PatchLaneStatusMenu.Provider>
          </TableLanes.Item>
        </TableLanes.Body>
      </TableLanes.Root>
    </main>
  )
}
