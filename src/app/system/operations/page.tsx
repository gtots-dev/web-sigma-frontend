import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { TableOperations } from '@/modules/operations/presentation/components/table-operations'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_OPERATIONS } from '@/modules/shared/presentation/messages/operations'

interface Data {
  title: string
  description: string
}

export default async function OperationsPage() {
  const data: Data = {
    title: MESSAGES_OPERATIONS['4.1'],
    description: MESSAGES_OPERATIONS['4.2']
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
      <TableOperations />
    </main>
  )
}
