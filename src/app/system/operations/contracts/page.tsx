import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { TableContracts } from '@/modules/contracts/presentation/components/table-contracts'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { AddContractMenu } from '@/modules/contracts/presentation/components/add-contract-menu'
import { AddContractMenuComponent } from '@/modules/contracts/presentation/components/add-contract-menu/add-contract-menu.component'
import { EditContractMenu } from '@/modules/contracts/presentation/components/edit-contract-menu'
import { ContractOptionsDropdown } from '@/modules/contracts/presentation/components/contract-options-dropdown'
import { EditContractMenuComponent } from '@/modules/contracts/presentation/components/edit-contract-menu/edit-contract-menu.component'

interface Data {
  title: string
  description: string
  menuAddContractTitle: string
  menuAddContractDescription: string
  menuEditContractTitle: string
  menuEditContractDescription: string
}

export default async function ContractsPage() {
  const data: Data = {
    title: MESSAGES_CONTRACTS['3.1'],
    description: MESSAGES_CONTRACTS['3.2'],
    menuAddContractTitle: MESSAGES_CONTRACTS['3.4'],
    menuAddContractDescription: MESSAGES_CONTRACTS['3.5'],
    menuEditContractTitle: MESSAGES_CONTRACTS['3.22'],
    menuEditContractDescription: MESSAGES_CONTRACTS['3.23']
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
        <AddContractMenu.Provider>
          <AddContractMenu.Trigger />
          <AddContractMenuComponent
            title={data.menuAddContractTitle}
            description={data.menuAddContractDescription}
          />
        </AddContractMenu.Provider>
      </ActionSection.Root>
      <TableContracts.Root>
        <TableContracts.Header />
        <TableContracts.Body>
          <TableContracts.Item>
            <EditContractMenu.Provider>
              <ContractOptionsDropdown.Root>
                <ContractOptionsDropdown.Trigger />
                <ContractOptionsDropdown.Menu>
                  <ContractOptionsDropdown.Item>
                    <EditContractMenu.Trigger />
                  </ContractOptionsDropdown.Item>
                </ContractOptionsDropdown.Menu>
                <EditContractMenuComponent
                  title={data.menuEditContractTitle}
                  description={data.menuEditContractDescription}
                />
              </ContractOptionsDropdown.Root>
            </EditContractMenu.Provider>
          </TableContracts.Item>
        </TableContracts.Body>
      </TableContracts.Root>
    </main>
  )
}
