'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { ProcessingUnitForm } from '../processing-unit-form'
import { useEditProcessingUnitForm } from '../../hooks/use-edit-processing-unit-form.hook'
import { useEditProcessingUnitSubmit } from '../../hooks/use-edit-processing-unit-submit.hook'
import { useProcessingUnitById } from '../../hooks/use-processing-unit-by-id.hook'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PatchProcessingUnitModalProps {
  title: string
  description: string
  processingUnitId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchProcessingUnitFormBodyProps {
  title: string
  description: string
  processingUnit: ProcessingUnitEntity
  onClose: () => void
}

function PatchProcessingUnitFormBody({
  title,
  description,
  processingUnit,
  onClose
}: PatchProcessingUnitFormBodyProps) {
  const { methods } = useEditProcessingUnitForm(processingUnit)
  const { onAction } = useEditProcessingUnitSubmit()

  const handleSubmit = (data: ProcessingUnitEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ProcessingUnitForm.Form>
            <ProcessingUnitForm.Input.Name />
            <ProcessingUnitForm.Input.cfg />
          </ProcessingUnitForm.Form>
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
          <ProcessingUnitForm.Submit<ProcessingUnitEntity>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchProcessingUnitModal({
  title,
  description,
  processingUnitId,
  onClose,
  onReturn
}: PatchProcessingUnitModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { processingUnit, loading } = useProcessingUnitById(processingUnitId)

  if (!loading && !processingUnit) {
    return (
      <ModalShell.Empty
        title="Unidade de processamento não encontrada"
        description={`A unidade de processamento solicitada com o ID ${processingUnitId} não existe ou foi removida.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {processingUnit && (
        <PatchProcessingUnitFormBody
          title={title}
          description={description}
          processingUnit={processingUnit}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
