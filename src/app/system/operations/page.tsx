import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { HeaderOperation } from '@/modules/operations/presentation/components/header-operation'
import { TableOperations } from '@/modules/operations/presentation/components/table-operations'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_OPERATIONS } from '@/modules/shared/presentation/messages/operations'

interface Data {
  title: string
  description: string
}

export default async function OperationsPage() {
  const getOperation = GetOperationsFactory.create()
  const operations = await getOperation.execute()

  const data: Data = {
    title: MESSAGES_OPERATIONS['4.1'],
    description: MESSAGES_OPERATIONS['4.2']
  }

  return (
    <main className="flex flex-col flex-1 p-10 pb-0 gap-5">
      <HeaderOperation.Root>
        <HeaderOperation.Title>{data.title}</HeaderOperation.Title>
        <HeaderOperation.Description>
          {data.description}
        </HeaderOperation.Description>
      </HeaderOperation.Root>
      <Separator orientation="horizontal" />
      <TableOperations.Root limitTo={11} data={operations} />
    </main>
  )
}
