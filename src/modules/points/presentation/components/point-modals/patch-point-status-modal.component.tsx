'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { PointForm } from '../point-form'
import { usePatchPointStatusForm } from '../../hooks/use-patch-point-status-form.hook'
import { usePatchPointStatusSubmit } from '../../hooks/use-patch-point-status-submit.hook'
import { usePointById } from '../../hooks/use-point-by-id.hook'
import type { PointEnableAndDisableInterface } from '@/modules/points/domain/interfaces/point-enable-and-disable.interface'

export interface PatchPointStatusModalProps {
  title: string
  description: string
  pointId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchPointStatusFormBodyProps {
  title: string
  description: string
  point: PointEnableAndDisableInterface
  onClose: () => void
}

function PatchPointStatusFormBody({
  title,
  description,
  point,
  onClose
}: PatchPointStatusFormBodyProps) {
  const { methods } = usePatchPointStatusForm(point)
  const { onAction } = usePatchPointStatusSubmit()

  const handleSubmit = (data: PointEnableAndDisableInterface) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <PointForm.Form>
            <PointForm.Input.Enabled />
          </PointForm.Form>
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
          <PointForm.Submit<PointEnableAndDisableInterface>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchPointStatusModal({
  title,
  description,
  pointId,
  onClose,
  onReturn
}: PatchPointStatusModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { point, loading } = usePointById(pointId)

  if (!loading && !point) {
    return (
      <ModalShell.Empty
        title="Ponto não encontrado"
        description={`O ponto solicitado com o ID ${pointId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {point && (
        <PatchPointStatusFormBody
          title={title}
          description={description}
          point={{ id: point.id, enabled: point.enabled }}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
