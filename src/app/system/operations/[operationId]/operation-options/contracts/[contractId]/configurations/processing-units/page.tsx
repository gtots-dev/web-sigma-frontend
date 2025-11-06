import { AddProcessingUnitMenu } from '@/modules/processing-units/presentation/components/add-processing-unit-menu'
import { AddProcessingUnitMenuComponent } from '@/modules/processing-units/presentation/components/add-processing-unit-menu/add-processing-unit-menu.component'
import { EditProcessingUnitsMenu } from '@/modules/processing-units/presentation/components/edit-processing-unit-menu'
import { EditProcessingUnitsMenuComponent } from '@/modules/processing-units/presentation/components/edit-processing-unit-menu/edit-processing-unit-menu.component'
import { ProcessingUnitsOptionsDropdown } from '@/modules/processing-units/presentation/components/processing-unit-options-dropdown'
import { PatchProcessingUnitsStatusMenu } from '@/modules/processing-units/presentation/components/patch-processing-unit-status-menu'
import { PatchProcessingUnitsStatusMenuComponent } from '@/modules/processing-units/presentation/components/patch-processing-unit-status-menu/put-processing-unit-status-menu.component'
import { TabledProcessingUnits } from '@/modules/processing-units/presentation/components/table-processing-units'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'

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

export default function ProcessingUnitsPage() {
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
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <HeaderSection.Root>
        <HeaderSection.Title>{data.title}</HeaderSection.Title>
        <HeaderSection.Description>
          {data.description}
        </HeaderSection.Description>
      </HeaderSection.Root>
      <Separator orientation="horizontal" />
      <ActionSection.Root>
        <AddProcessingUnitMenu.Provider>
          <AddProcessingUnitMenu.Trigger />
          <AddProcessingUnitMenuComponent
            title={data.titleAdd}
            description={data.descriptionAdd}
          />
        </AddProcessingUnitMenu.Provider>
      </ActionSection.Root>
      <ActionSection.Root>
        <TabledProcessingUnits.Root>
          <TabledProcessingUnits.Header />
          <TabledProcessingUnits.Body>
            <TabledProcessingUnits.Item>
              <PatchProcessingUnitsStatusMenu.Provider>
                <EditProcessingUnitsMenu.Provider>
                  <ProcessingUnitsOptionsDropdown.Root>
                    <ProcessingUnitsOptionsDropdown.Trigger />
                    <ProcessingUnitsOptionsDropdown.Menu>
                      <ProcessingUnitsOptionsDropdown.Item>
                        <EditProcessingUnitsMenu.Trigger />
                      </ProcessingUnitsOptionsDropdown.Item>

                      <ProcessingUnitsOptionsDropdown.Item>
                        <PatchProcessingUnitsStatusMenu.Trigger />
                      </ProcessingUnitsOptionsDropdown.Item>
                    </ProcessingUnitsOptionsDropdown.Menu>
                    
                    <EditProcessingUnitsMenuComponent
                      title={data.titleEdit}
                      description={data.descriptionEdit}
                    />
                    <PatchProcessingUnitsStatusMenuComponent
                      title={data.titlePutStatus}
                      description={data.descriptionPutStatus}
                    />
                  </ProcessingUnitsOptionsDropdown.Root>
                </EditProcessingUnitsMenu.Provider>
              </PatchProcessingUnitsStatusMenu.Provider>
            </TabledProcessingUnits.Item>
          </TabledProcessingUnits.Body>
        </TabledProcessingUnits.Root>
      </ActionSection.Root>
    </main>
  )
}
