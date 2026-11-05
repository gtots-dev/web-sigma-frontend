'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { ProcessingUnitForm } from '../processing-unit-form'
import { usePatchProcessingUnitStatusForm } from '../../hooks/use-patch-processing-unit-status-form.hook'
import { usePatchProcessingUnitStatusSubmit } from '../../hooks/use-patch-processing-unit-status-submit.hook'
import { useProcessingUnitById } from '../../hooks/use-processing-unit-by-id.hook'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { ProcessingUnitEnableAndDisableInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-enable-and-disable.interface'

export interface PatchProcessingUnitStatusModalProps {
  title: string
  description: string
  processingUnitId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchProcessingUnitStatusFormBodyProps {
  title: string
  description: string
  processingUnit: ProcessingUnitEntity
  onClose: () => void
}

function PatchProcessingUnitStatusFormBody({
  title,
  description,
  processingUnit,
  onClose
}: PatchProcessingUnitStatusFormBodyProps) {
  const { methods } = usePatchProcessingUnitStatusForm(processingUnit)
  const { onAction } = usePatchProcessingUnitStatusSubmit()

  const handleSubmit = (data: ProcessingUnitEnableAndDisableInterface) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ProcessingUnitForm.Form>
            <ProcessingUnitForm.Input.Enabled />
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
          <ProcessingUnitForm.Submit<ProcessingUnitEnableAndDisableInterface>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchProcessingUnitStatusModal({
  title,
  description,
  processingUnitId,
  onClose,
  onReturn
}: PatchProcessingUnitStatusModalProps) {
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
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {processingUnit && (
        <PatchProcessingUnitStatusFormBody
          title={title}
          description={description}
          processingUnit={processingUnit}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
