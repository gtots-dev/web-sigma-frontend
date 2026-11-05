'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { PointForm } from '../point-form'
import { usePostPointForm } from '../../hooks/use-post-point-form.hook'
import { usePostPointSubmit } from '../../hooks/use-post-point-submit.hook'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface PostPointModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostPointModal({
  title,
  description,
  onClose,
  onReturn
}: PostPointModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = usePostPointForm()
  const { onAction } = usePostPointSubmit()

  const handleSubmit = (point: PointEntity) => onAction(point, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <PointForm.Form>
            <PointForm.Input.Name require />
            <PointForm.Input.Description />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PointForm.Input.Latitude />
              <PointForm.Input.Longitude />
            </div>
            <PointForm.Input.cfg />
          </PointForm.Form>
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
          <PointForm.Submit<PointEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
