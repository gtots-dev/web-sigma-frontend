'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { ContractForm } from '../contract-form'
import { usePatchContractForm } from '../../hooks/use-patch-contract-form.hook'
import { usePatchContractSubmit } from '../../hooks/use-patch-contract-submit.hook'
import { useContracts } from '../../hooks/use-contracts.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { FormProvider } from 'react-hook-form'

export interface PatchContractModalProps {
  title: string
  description: string
  contractId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchContractFormBodyProps {
  title: string
  description: string
  contract: ContractEntity
  onClose: () => void
}

function PatchContractFormBody({
  title,
  description,
  contract,
  onClose
}: PatchContractFormBodyProps) {
  const { methods } = usePatchContractForm(contract)
  const { onAction } = usePatchContractSubmit()

  const handleSubmit = (contractData: Partial<ContractEntity>) => {
    const updatedContract: ContractEntity = {
      ...contract,
      ...contractData
    }
    onAction(updatedContract, onClose)
  }

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ContractForm.Form>
            <ContractForm.Input.Name />
            <ContractForm.Input.Alias />
            <ContractForm.Input.cfg />
          </ContractForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <ContractForm.Submit onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchContractModal({
  title,
  description,
  contractId,
  onClose,
  onReturn
}: PatchContractModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({ onClose, onReturn })
  const { loading, getContractById } = useContracts()
  const contract = getContractById(contractId)

  if (!loading && !contract) {
    return (
      <ModalShell.Empty
        title="Contrato não encontrado"
        description={`O contrato solicitado com o ID ${contractId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {contract && (
        <PatchContractFormBody
          title={title}
          description={description}
          contract={contract}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
