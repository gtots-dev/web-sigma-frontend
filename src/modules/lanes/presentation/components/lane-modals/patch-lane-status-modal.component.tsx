'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { LaneForm } from '../lane-form'
import { usePatchLaneStatusForm } from '../../hooks/use-patch-lane-status-form.hook'
import { usePatchLaneStatusSubmit } from '../../hooks/use-patch-lane-status-submit.hook'
import { useLaneById } from '../../hooks/use-lane-by-id.hook'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

export interface PatchLaneStatusModalProps {
  title: string
  description: string
  laneId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchLaneStatusFormBodyProps {
  title: string
  description: string
  lane: LaneEnableAndDisableInterface
  onClose: () => void
}

function PatchLaneStatusFormBody({
  title,
  description,
  lane,
  onClose
}: PatchLaneStatusFormBodyProps) {
  const { methods } = usePatchLaneStatusForm(lane)
  const { onAction } = usePatchLaneStatusSubmit()

  const handleSubmit = (data: LaneEnableAndDisableInterface) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <LaneForm.Form>
            <LaneForm.Input.Enabled />
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
          <LaneForm.Submit<LaneEnableAndDisableInterface>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchLaneStatusModal({
  title,
  description,
  laneId,
  onClose,
  onReturn
}: PatchLaneStatusModalProps) {
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
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {lane && (
        <PatchLaneStatusFormBody
          title={title}
          description={description}
          lane={{ id: lane.id, enabled: lane.enabled }}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
