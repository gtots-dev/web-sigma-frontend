'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { RestrictionForm } from '../restriction-form'
import { usePatchRestrictionForm } from '../../hooks/use-patch-restriction-form.hook'
import { usePatchRestrictionSubmit } from '../../hooks/use-patch-restriction-submit.hook'
import { useRestrictionById } from '../../hooks/use-restriction-by-id.hook'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

export interface PatchRestrictionModalProps {
  title: string
  description: string
  restrictionId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchRestrictionFormBodyProps {
  title: string
  description: string
  restriction: RestrictionEntity
  onClose: () => void
}

function PatchRestrictionFormBody({
  title,
  description,
  restriction,
  onClose
}: PatchRestrictionFormBodyProps) {
  const { methods } = usePatchRestrictionForm(restriction)
  const { onAction } = usePatchRestrictionSubmit(Number(restriction.id))

  const handleSubmit = (data: RestrictionEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <RestrictionForm.Form>
            <RestrictionForm.Input.Name require />
            <RestrictionForm.Input.Code require />
            <RestrictionForm.Input.ColorPicker
              name="color"
              label="Cor da restrição"
              require
            />
          </RestrictionForm.Form>
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
          <RestrictionForm.Submit<RestrictionEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchRestrictionModal({
  title,
  description,
  restrictionId,
  onClose,
  onReturn
}: PatchRestrictionModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { restriction, loading } = useRestrictionById(restrictionId)

  if (!loading && !restriction) {
    return (
      <ModalShell.Empty
        title="Restrição não encontrada"
        description={`A restrição solicitada com o ID ${restrictionId} não existe ou foi removida.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {restriction && (
        <PatchRestrictionFormBody
          title={title}
          description={description}
          restriction={restriction}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
