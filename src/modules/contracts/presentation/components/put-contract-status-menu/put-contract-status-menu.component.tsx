'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PutContractStatusMenu } from '.'
import { useTableContract } from '../../contexts/table-contract.context'
import { useDialog } from './put-contract-status-menu-provider.component'
import { ContractForm } from '../contract-form'
import { usePutContractStatusSubmit } from '../../hooks/use-put-contract-status-submit.hook'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

interface PutContractStatusMenuComponentProps {
  title: string
  description: string
}

export function PutContractStatusMenuComponent({
  title,
  description
}: PutContractStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutContractStatusSubmit()
  const contract = useTableContract()

  return (
    <PutContractStatusMenu.Root
      contract={contract}
      close={close}
      isOpen={isOpen}
    >
      <PutContractStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutContractStatusMenu.Header title={title} description={description} />

        <ContractForm.Form>
          <ContractForm.Input.Enabled />
        </ContractForm.Form>

        <PutContractStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ContractForm.Submit
            onSubmit={(contractStatus: ContractEntity) =>
              onAction(contractStatus, close)
            }
          />
        </PutContractStatusMenu.Footer>
      </PutContractStatusMenu.Content>
    </PutContractStatusMenu.Root>
  )
}
