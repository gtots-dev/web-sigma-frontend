'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-contract-menu-provider.component'
import { EditContractMenu } from '.'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { EditContractForm } from '../edit-contract-form-provider'
import { ContractForm } from '../contract-form'
import { useEditContractSubmit } from '../../hooks/use-edit-contract-submit.hook'
import { useTableContract } from '../../contexts/table-contract.context'

interface EditContractMenuComponentProps {
  title: string
  description: string
}

export function EditContractMenuComponent({
  title,
  description
}: EditContractMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const contract = useTableContract()
  const { onAction } = useEditContractSubmit()

  return (
    <EditContractMenu.Root>
      <EditContractMenu.Content>
        <EditContractMenu.Header title={title} description={description} />
        <EditContractForm.Provider isOpen={isOpen} contract={contract}>
          <ContractForm.Form>
            <ContractForm.Input.Name />
            <ContractForm.Input.Alias />
            <ContractForm.Input.cfg />
            <ContractForm.Input.Enabled />
          </ContractForm.Form>

          <EditContractMenu.Footer>
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
          </EditContractMenu.Footer>
        </EditContractForm.Provider>
      </EditContractMenu.Content>
    </EditContractMenu.Root>
  )
}
