'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { ContractForm } from '../contract-form'
import { useAddContractForm } from '../../hooks/use-add-contract-form.hook'
import { useAddContractSubmit } from '../../hooks/use-add-contract-submit.hook'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { FormProvider } from 'react-hook-form'

export interface PostContractModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostContractModal({
  title,
  description,
  onClose,
  onReturn
}: PostContractModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = useAddContractForm()
  const { onAction } = useAddContractSubmit()

  const handleSubmit = (contract: ContractEntity) =>
    onAction(contract, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ContractForm.Form>
            <ContractForm.Input.Name require />
            <ContractForm.Input.Alias require />
            <ContractForm.Input.cfg />
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
          <ContractForm.Submit onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
