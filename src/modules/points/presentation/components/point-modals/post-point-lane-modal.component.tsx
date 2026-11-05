'use client'

import { useEffect, useMemo, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { PointForm } from '../point-form'
import { usePostPointLaneForm } from '../../hooks/use-post-point-lane-form.hook'
import { usePostPointLaneSubmit } from '../../hooks/use-post-point-lane-submit.hook'
import { usePointById } from '../../hooks/use-point-by-id.hook'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { PointLaneInterface } from '@/modules/points/domain/interfaces/point-lane.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'

export interface PostPointLaneModalProps {
  title: string
  description: string
  pointId: number
  isPermittedLane: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface PostPointLaneFormBodyProps {
  title: string
  description: string
  pointId: number
  isPermittedLane: boolean
  lanesAvailableForSelection: LaneWithPointAndGroupInterface[]
  onClose: () => void
}

function PostPointLaneFormBody({
  title,
  description,
  pointId,
  isPermittedLane,
  lanesAvailableForSelection,
  onClose
}: PostPointLaneFormBodyProps) {
  const { methods } = usePostPointLaneForm(pointId)
  const { onAction } = usePostPointLaneSubmit(pointId)

  const handleSubmit = (data: PointLaneInterface) => onAction(data, onClose)

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <PointForm.Form>
          <PointForm.Input.Lanes
            lanes={lanesAvailableForSelection}
            hasPermission={isPermittedLane}
          />
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
        <PointForm.Submit<PointLaneInterface> onSubmit={handleSubmit} />
      </ModalShell.Footer>
    </FormProvider>
  )
}

export function PostPointLaneModal({
  title,
  description,
  pointId,
  isPermittedLane,
  onClose,
  onReturn
}: PostPointLaneModalProps) {
  const { operationId, contractId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { point, loading: loadingPoint } = usePointById(pointId)
  const { contractLanes, getContractLanes } = useLaneStore()
  const [loadingLanes, setLoadingLanes] = useState(isPermittedLane)

  useEffect(() => {
    if (!isPermittedLane) return

    let active = true
    getContractLanes({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingLanes(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = loadingPoint || loadingLanes

  const lanesAvailableForSelection = useMemo(
    () =>
      contractLanes.filter(
        (laneItem) =>
          laneItem.point_id === null || laneItem.point_id === pointId
      ),
    [contractLanes, pointId]
  )

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

      {!loading && point && (
        <PostPointLaneFormBody
          title={title}
          description={description}
          pointId={pointId}
          isPermittedLane={isPermittedLane}
          lanesAvailableForSelection={lanesAvailableForSelection}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
