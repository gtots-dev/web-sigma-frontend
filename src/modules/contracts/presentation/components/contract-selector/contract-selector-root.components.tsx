'use client'

import { MenuSelectContract } from '@/modules/contracts/presentation/components/menu-select-contract'
import type { ContractInterface } from '@/modules/contracts/domain/interfaces/contract.interface'
import { ContractForm } from '../select-contract-form'
import { useContractSelector } from '../../hooks/use-contract-selector.hook'

interface ContractSelectorRootProps {
  title: string
  description: string
  contractId: ContractInterface['id']
  contracts: ContractInterface[]
}

export function ContractSelectorRoot({
  title,
  description,
  contractId,
  contracts
}: ContractSelectorRootProps) {
  const { open, setOpen, contract } = useContractSelector(contractId, contracts)

  return (
    <MenuSelectContract.Root open={open} onOpenChange={setOpen}>
      <MenuSelectContract.Trigger />
      <MenuSelectContract.Content title={title} description={description}>
        <ContractForm.Provider contract={contract}>
          <ContractForm.Form>
            <ContractForm.Search />
            <ContractForm.Radios contracts={contracts} />
          </ContractForm.Form>
          <MenuSelectContract.Footer>
            <ContractForm.Submit close={() => setOpen(false)} />
          </MenuSelectContract.Footer>
        </ContractForm.Provider>
      </MenuSelectContract.Content>
    </MenuSelectContract.Root>
  )
}
