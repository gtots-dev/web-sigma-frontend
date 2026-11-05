'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { LaneForm } from '../lane-form'
import { useAddLaneForm } from '../../hooks/use-add-lane-form.hook'
import { useAddLaneSubmit } from '../../hooks/use-add-lane-submit.hook'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PostLaneModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostLaneModal({
  title,
  description,
  onClose,
  onReturn
}: PostLaneModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = useAddLaneForm()
  const { onAction } = useAddLaneSubmit()

  const handleSubmit = (lane: LaneEntity) => onAction(lane, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <LaneForm.Form>
            <LaneForm.Input.Name require />
            <LaneForm.Input.cfg />
          </LaneForm.Form>
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
          <LaneForm.Submit<LaneEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
