'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './add-contract-menu-provider.component'
import { AddContractMenu } from '.'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { ContractForm } from '../contract-form'
import { useAddContractSubmit } from '../../hooks/use-add-contract-submit.hook'

interface AddContractMenuComponentProps {
  title: string
  description: string
}

export function AddContractMenuComponent({
  title,
  description
}: AddContractMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddContractSubmit()

  return (
    <AddContractMenu.Root isOpen={isOpen} close={close}>
      <AddContractMenu.Content>
        <AddContractMenu.Header title={title} description={description} />
        <ContractForm.Form>
          <ContractForm.Input.Name require />
          <ContractForm.Input.Alias require />
          <ContractForm.Input.cfg />
        </ContractForm.Form>

        <AddContractMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ContractForm.Submit
            onSubmit={(contract: ContractEntity) => onAction(contract, close)}
          />
        </AddContractMenu.Footer>
      </AddContractMenu.Content>
    </AddContractMenu.Root>
  )
}
