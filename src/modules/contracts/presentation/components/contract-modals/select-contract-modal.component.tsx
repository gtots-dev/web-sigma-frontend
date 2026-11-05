'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { useContractStore } from '../../stores/contract.store'
import { ContractForm } from '../select-contract-form'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface SelectContractModalProps {
  title: string
  description: string
  contracts?: ContractEntity[]
  onClose?: () => void
  onReturn?: () => void
}

export function SelectContractModal({
  title,
  description,
  contracts,
  onClose,
  onReturn
}: SelectContractModalProps) {
  const { handleClose } = useModalNavigation({
    onClose,
    onReturn
  })
  const { contract, contracts: storeContracts } = useContractStore()
  const resolvedContracts =
    contracts && contracts.length > 0 ? contracts : storeContracts

  return (
    <ModalShell.Root>
      <ModalShell.Header title={title} description={description} />
      <ContractForm.Provider contract={contract}>
        <ModalShell.Content className="flex flex-col overflow-hidden">
          <ContractForm.Form>
            <ContractForm.Search />
            <ContractForm.Radios contracts={resolvedContracts} />
          </ContractForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <ContractForm.Submit />
        </ModalShell.Footer>
      </ContractForm.Provider>
    </ModalShell.Root>
  )
}
