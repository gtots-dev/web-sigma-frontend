'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { ProcessingUnitForm } from '../processing-unit-form'
import { useAddProcessingUnitForm } from '../../hooks/use-add-processing-unit-form.hook'
import { useAddProcessingUnitSubmit } from '../../hooks/use-add-processing-unit-submit.hook'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PostProcessingUnitModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostProcessingUnitModal({
  title,
  description,
  onClose,
  onReturn
}: PostProcessingUnitModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = useAddProcessingUnitForm()
  const { onAction } = useAddProcessingUnitSubmit()

  const handleSubmit = (processingUnit: ProcessingUnitEntity) =>
    onAction(processingUnit, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ProcessingUnitForm.Form>
            <ProcessingUnitForm.Input.Name require />
            <ProcessingUnitForm.Input.cfg />
          </ProcessingUnitForm.Form>
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
          <ProcessingUnitForm.Submit<ProcessingUnitEntity>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
