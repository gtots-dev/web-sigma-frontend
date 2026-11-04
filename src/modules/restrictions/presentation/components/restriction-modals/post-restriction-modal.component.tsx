'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { RestrictionForm } from '../restriction-form'
import { usePostRestrictionForm } from '../../hooks/use-post-restriction-form.hook'
import { usePostRestrictionSubmit } from '../../hooks/use-post-restriction-submit.hook'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

export interface PostRestrictionModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostRestrictionModal({
  title,
  description,
  onClose,
  onReturn
}: PostRestrictionModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = usePostRestrictionForm()
  const { onAction } = usePostRestrictionSubmit()

  const handleSubmit = (restriction: RestrictionEntity) =>
    onAction(restriction, handleClose)

  return (
    <ModalShell.Root>
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
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <RestrictionForm.Submit<RestrictionEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
