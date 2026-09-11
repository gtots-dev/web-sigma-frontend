'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchContractMenu } from '.'
import { ContractForm } from '../contract-form'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { usePatchContractSubmit } from '../../hooks/use-patch-contract-submit.hook'
import { usePatchContractMenuContext } from '../../contexts/patch-contract-menu.context'
import { useTableContract } from '../../contexts/table-contract.context'

interface PatchContractMenuComponentProps {
  title: string
  description: string
}

export function PatchContractMenuComponent({
  title,
  description
}: PatchContractMenuComponentProps) {
  const { isOpen, close } = usePatchContractMenuContext()
  const contract = useTableContract()
  const { onAction } = usePatchContractSubmit()

  return (
    <PatchContractMenu.Root isOpen={isOpen} close={close} contract={contract}>
      <PatchContractMenu.Content>
        <PatchContractMenu.Header title={title} description={description} />
        <ContractForm.Form>
          <ContractForm.Input.Name />
          <ContractForm.Input.Alias />
          <ContractForm.Input.cfg />
        </ContractForm.Form>

        <PatchContractMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ContractForm.Submit
            onSubmit={(contractData: Partial<ContractEntity>) =>
              onAction(contractData as ContractEntity, close)
            }
          />
        </PatchContractMenu.Footer>
      </PatchContractMenu.Content>
    </PatchContractMenu.Root>
  )
}
