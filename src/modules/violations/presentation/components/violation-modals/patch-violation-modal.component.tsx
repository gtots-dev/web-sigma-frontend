'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { ViolationForm } from '../violation-form'
import { usePatchViolationForm } from '../../hooks/use-patch-violation-form.hook'
import { usePatchViolationSubmit } from '../../hooks/use-patch-violation-submit.hook'
import { useViolationById } from '../../hooks/use-violation-by-id.hook'
import type { ViolationEntity } from '@/modules/violations/domain/entities/violation.entity'

export interface PatchViolationModalProps {
  title: string
  description: string
  violationId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchViolationFormBodyProps {
  title: string
  description: string
  violation: ViolationEntity
  onClose: () => void
}

function PatchViolationFormBody({
  title,
  description,
  violation,
  onClose
}: PatchViolationFormBodyProps) {
  const { methods } = usePatchViolationForm(violation)
  const { onAction } = usePatchViolationSubmit(Number(violation.id))

  const handleSubmit = (data: ViolationEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <ViolationForm.Form>
            <ViolationForm.Input.Name />
            <ViolationForm.Input.Code />
            <ViolationForm.Input.ColorPicker
              name="color"
              label="Cor da violação"
              require
            />
          </ViolationForm.Form>
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
          <ViolationForm.Submit<ViolationEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchViolationModal({
  title,
  description,
  violationId,
  onClose,
  onReturn
}: PatchViolationModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { violation, loading } = useViolationById(violationId)

  if (!loading && !violation) {
    return (
      <ModalShell.Empty
        title="Violação não encontrada"
        description={`A violação solicitada com o ID ${violationId} não existe ou foi removida.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {violation && (
        <PatchViolationFormBody
          title={title}
          description={description}
          violation={violation}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
