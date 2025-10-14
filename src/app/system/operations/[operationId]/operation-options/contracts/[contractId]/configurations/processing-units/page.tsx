import { AddProcessingUnitMenu } from '@/modules/processing-units/presentation/components/add-processing-unit-menu'
import { AddProcessingUnitMenuComponent } from '@/modules/processing-units/presentation/components/add-processing-unit-menu/add-processing-unit-menu.component'
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
}

export default function ProcessingUnitsPage() {
  const data: Data = {
    title: MESSAGES_PROCESSING_UNIT['7.1'],
    description: MESSAGES_PROCESSING_UNIT['7.2'],
    titleAdd: MESSAGES_PROCESSING_UNIT['7.4'],
    descriptionAdd: MESSAGES_PROCESSING_UNIT['7.5']
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
            <TabledProcessingUnits.Item />
          </TabledProcessingUnits.Body>
        </TabledProcessingUnits.Root>
      </ActionSection.Root>
    </main>
  )
}
