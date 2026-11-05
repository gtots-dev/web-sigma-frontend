'use client'

import { useEffect, useMemo, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { GroupForm } from '../group-form'
import { usePostGroupPointForm } from '../../hooks/use-post-group-point-form.hook'
import { usePostGroupPointSubmit } from '../../hooks/use-post-group-point-submit.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import type { GroupPointInterface } from '@/modules/groups/domain/interfaces/group-point.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

export interface PostGroupPointModalProps {
  title: string
  description: string
  groupId: number
  isPermittedPoints: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface PostGroupPointFormBodyProps {
  title: string
  description: string
  groupId: number
  isPermittedPoints: boolean
  pointsAvailableForSelection: PointWithGroupInterface[]
  onClose: () => void
}

function PostGroupPointFormBody({
  title,
  description,
  groupId,
  isPermittedPoints,
  pointsAvailableForSelection,
  onClose
}: PostGroupPointFormBodyProps) {
  const { methods } = usePostGroupPointForm(groupId)
  const { onAction } = usePostGroupPointSubmit(groupId)

  const handleSubmit = (data: GroupPointInterface) => onAction(data, onClose)

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <GroupForm.Form>
          <GroupForm.Input.Points
            points={pointsAvailableForSelection}
            hasPermission={isPermittedPoints}
          />
        </GroupForm.Form>
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
        <GroupForm.Submit<GroupPointInterface> onSubmit={handleSubmit} />
      </ModalShell.Footer>
    </FormProvider>
  )
}

export function PostGroupPointModal({
  title,
  description,
  groupId,
  isPermittedPoints,
  onClose,
  onReturn
}: PostGroupPointModalProps) {
  const { operationId, contractId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { group, loading: loadingGroup } = useGroupById(groupId)
  const { points, getPoints } = usePointStore()
  const [loadingPoints, setLoadingPoints] = useState(isPermittedPoints)

  useEffect(() => {
    if (!isPermittedPoints) return

    let active = true
    getPoints({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingPoints(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = loadingGroup || loadingPoints

  const pointsAvailableForSelection = useMemo(
    () =>
      points.filter(
        (pointItem) =>
          pointItem.group_id.length === 0 ||
          pointItem.group_id.includes(groupId)
      ),
    [points, groupId]
  )

  if (!loading && !group) {
    return (
      <ModalShell.Empty
        title="Grupo não encontrado"
        description={`O grupo solicitado com o ID ${groupId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && group && (
        <PostGroupPointFormBody
          title={title}
          description={description}
          groupId={groupId}
          isPermittedPoints={isPermittedPoints}
          pointsAvailableForSelection={pointsAvailableForSelection}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
