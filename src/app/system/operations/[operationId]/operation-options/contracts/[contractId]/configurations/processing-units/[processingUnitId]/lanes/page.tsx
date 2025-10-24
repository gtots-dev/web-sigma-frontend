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
import { PutLaneStatusMenu } from '@/modules/lanes/presentation/components/put-lane-menu'
import { PutLaneStatusMenuComponent } from '@/modules/lanes/presentation/components/put-lane-menu/put-lane-status-menu.component'

interface Data {
  title: string
  description: string
  menuAddLaneTitle: string
  menuAddLaneDescription: string
  menuEditLaneTitle: string
  menuEditLaneDescription: string
  menuPutLaneStatusTitle: string
  menuPutLaneStatusDescription: string
}

export default async function LanesPage() {
  const data: Data = {
    title: MESSAGES_LANE[8.1],
    description: MESSAGES_LANE['8.2'],
    menuAddLaneTitle: MESSAGES_LANE['8.4'],
    menuAddLaneDescription: MESSAGES_LANE['8.5'],
    menuEditLaneTitle: MESSAGES_LANE['8.7'],
    menuEditLaneDescription: MESSAGES_LANE['8.8'],
    menuPutLaneStatusTitle: MESSAGES_LANE['8.9'],
    menuPutLaneStatusDescription: MESSAGES_LANE['8.10']
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <HeaderSection.Root>
        <HeaderSection.Title>{data.title}</HeaderSection.Title>
        <HeaderSection.Description>
          {data.description}
        </HeaderSection.Description>
      </HeaderSection.Root>
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
            <PutLaneStatusMenu.Provider>
              <EditLaneMenu.Provider>
                <LaneOptionsDropdown.Root>
                  <LaneOptionsDropdown.Trigger />
                  <LaneOptionsDropdown.Menu>
                    <LaneOptionsDropdown.Item>
                      <EditLaneMenu.Trigger />
                    </LaneOptionsDropdown.Item>

                    <LaneOptionsDropdown.Item>
                      <PutLaneStatusMenu.Trigger />
                    </LaneOptionsDropdown.Item>
                  </LaneOptionsDropdown.Menu>
                  <EditLaneMenuComponent
                    title={data.menuEditLaneTitle}
                    description={data.menuEditLaneDescription}
                  />

                  <PutLaneStatusMenuComponent
                    title={data.menuPutLaneStatusTitle}
                    description={data.menuPutLaneStatusDescription}
                  />
                </LaneOptionsDropdown.Root>
              </EditLaneMenu.Provider>
            </PutLaneStatusMenu.Provider>
          </TableLanes.Item>
        </TableLanes.Body>
      </TableLanes.Root>
    </main>
  )
}
