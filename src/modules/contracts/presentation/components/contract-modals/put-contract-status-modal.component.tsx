'use client'

import { useMemo } from 'react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { ContractForm } from '../contract-form'
import { usePutContractStatusForm } from '../../hooks/use-put-contract-status-form.hook'
import { usePutContractStatusSubmit } from '../../hooks/use-put-contract-status-submit.hook'
import { useTableContracts } from '../../hooks/use-table-contracts.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { FormProvider } from 'react-hook-form'

export interface PutContractStatusModalProps {
  title: string
  description: string
  contractId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PutContractStatusFormBodyProps {
  title: string
  description: string
  contract: ContractEntity
  onClose: () => void
}

function PutContractStatusFormBody({
  title,
  description,
  contract,
  onClose
}: PutContractStatusFormBodyProps) {
  const { methods } = usePutContractStatusForm(contract)
  const { onAction } = usePutContractStatusSubmit()

  const handleSubmit = (contractStatus: ContractEntity) =>
    onAction(contractStatus, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ContractForm.Form>
            <ContractForm.Input.Enabled />
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

export function PutContractStatusModal({
  title,
  description,
  contractId,
  onClose,
  onReturn
}: PutContractStatusModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({ onClose, onReturn })
  const { contracts, loading } = useTableContracts()

  const contract = useMemo(
    () => contracts.find((c) => c.id === contractId),
    [contracts, contractId]
  )

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
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {contract && (
        <PutContractStatusFormBody
          title={title}
          description={description}
          contract={contract}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
