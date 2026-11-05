'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { PointForm } from '../point-form'
import { usePatchPointForm } from '../../hooks/use-patch-point-form.hook'
import { usePatchPointSubmit } from '../../hooks/use-patch-point-submit.hook'
import { usePointById } from '../../hooks/use-point-by-id.hook'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface PatchPointModalProps {
  title: string
  description: string
  pointId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchPointFormBodyProps {
  title: string
  description: string
  point: PointEntity
  onClose: () => void
}

function PatchPointFormBody({
  title,
  description,
  point,
  onClose
}: PatchPointFormBodyProps) {
  const { methods } = usePatchPointForm(point)
  const { onAction } = usePatchPointSubmit()

  const handleSubmit = (data: PointEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
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
            onClick={onClose}
          >
            Cancelar
          </Button>
          <PointForm.Submit<PointEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchPointModal({
  title,
  description,
  pointId,
  onClose,
  onReturn
}: PatchPointModalProps) {
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
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {point && (
        <PatchPointFormBody
          title={title}
          description={description}
          point={point}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
