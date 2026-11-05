'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { LaneForm } from '../lane-form'
import { useEditLaneForm } from '../../hooks/use-edit-lane-form.hook'
import { useEditLaneSubmit } from '../../hooks/use-edit-lane-submit.hook'
import { useLaneById } from '../../hooks/use-lane-by-id.hook'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PatchLaneModalProps {
  title: string
  description: string
  laneId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchLaneFormBodyProps {
  title: string
  description: string
  lane: LaneEntity
  onClose: () => void
}

function PatchLaneFormBody({
  title,
  description,
  lane,
  onClose
}: PatchLaneFormBodyProps) {
  const { methods } = useEditLaneForm(lane)
  const { onAction } = useEditLaneSubmit()

  const handleSubmit = (data: LaneEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <LaneForm.Form>
            <LaneForm.Input.Name />
            <LaneForm.Input.cfg />
          </LaneForm.Form>
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
          <LaneForm.Submit<LaneEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchLaneModal({
  title,
  description,
  laneId,
  onClose,
  onReturn
}: PatchLaneModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { lane, loading } = useLaneById(laneId)

  if (!loading && !lane) {
    return (
      <ModalShell.Empty
        title="Faixa não encontrada"
        description={`A faixa solicitada com o ID ${laneId} não existe ou foi removida.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {lane && (
        <PatchLaneFormBody
          title={title}
          description={description}
          lane={lane}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
