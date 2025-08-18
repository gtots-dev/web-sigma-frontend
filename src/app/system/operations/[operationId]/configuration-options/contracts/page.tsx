import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { TableContracts } from '@/modules/contracts/presentation/components/table-contracts'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'

interface Data {
  title: string
  description: string
}

export default async function ContractsPage() {
  const data: Data = {
    title: MESSAGES_CONTRACTS['3.1'],
    description: MESSAGES_CONTRACTS['3.2']
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
      <TableContracts.Root>
        <TableContracts.Header />
        <TableContracts.Body>
          <TableContracts.Item />
        </TableContracts.Body>
      </TableContracts.Root>
    </main>
  )
}
