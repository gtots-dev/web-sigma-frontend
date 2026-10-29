'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { ContractForm } from '../contract-form'
import { usePostContractFilesForm } from '../../hooks/use-post-contract-files-form.hook'
import { usePostContractFilesSubmit } from '../../hooks/use-post-contract-files-submit.hook'
import { useContracts } from '../../hooks/use-contracts.hook'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { ContractFilesInterface } from '@/modules/contracts/domain/interfaces/contract-files.interface'
import { FormProvider } from 'react-hook-form'

export interface PostContractFilesModalProps {
  title: string
  description: string
  contractId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PostContractFilesFormBodyProps {
  title: string
  description: string
  contract: ContractEntity
  onClose: () => void
}

function PostContractFilesFormBody({
  title,
  description,
  contract,
  onClose
}: PostContractFilesFormBodyProps) {
  const { methods } = usePostContractFilesForm()
  const { onAction } = usePostContractFilesSubmit(contract.id)

  const handleSubmit = (files: ContractFilesInterface) => {
    onAction(files, onClose)
  }

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <ContractForm.Form>
          <ContractForm.Input.Files require />
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
  )
}

export function PostContractFilesModal({
  title,
  description,
  contractId,
  onClose,
  onReturn
}: PostContractFilesModalProps) {
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
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {contract && (
        <PostContractFilesFormBody
          title={title}
          description={description}
          contract={contract}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
