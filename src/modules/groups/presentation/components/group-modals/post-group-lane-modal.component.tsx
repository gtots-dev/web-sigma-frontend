'use client'

import { useEffect, useMemo, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { GroupForm } from '../group-form'
import { usePostGroupLaneForm } from '../../hooks/use-post-group-lane-form.hook'
import { usePostGroupLaneSubmit } from '../../hooks/use-post-group-lane-submit.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { GroupLaneInterface } from '@/modules/groups/domain/interfaces/group-lane.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'

export interface PostGroupLaneModalProps {
  title: string
  description: string
  groupId: number
  isPermittedLane: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface PostGroupLaneFormBodyProps {
  title: string
  description: string
  groupId: number
  isPermittedLane: boolean
  lanesAvailableForSelection: LaneWithPointAndGroupInterface[]
  onClose: () => void
}

function PostGroupLaneFormBody({
  title,
  description,
  groupId,
  isPermittedLane,
  lanesAvailableForSelection,
  onClose
}: PostGroupLaneFormBodyProps) {
  const { methods } = usePostGroupLaneForm(groupId)
  const { onAction } = usePostGroupLaneSubmit(groupId)

  const handleSubmit = (data: GroupLaneInterface) => onAction(data, onClose)

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <GroupForm.Form>
          <GroupForm.Input.Lanes
            lanes={lanesAvailableForSelection}
            hasPermission={isPermittedLane}
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
        <GroupForm.Submit<GroupLaneInterface> onSubmit={handleSubmit} />
      </ModalShell.Footer>
    </FormProvider>
  )
}

export function PostGroupLaneModal({
  title,
  description,
  groupId,
  isPermittedLane,
  onClose,
  onReturn
}: PostGroupLaneModalProps) {
  const { operationId, contractId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { group, loading: loadingGroup } = useGroupById(groupId)
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

  const loading = loadingGroup || loadingLanes

  const lanesAvailableForSelection = useMemo(
    () =>
      contractLanes.filter(
        (laneItem) =>
          laneItem.group_id.length === 0 || laneItem.group_id.includes(groupId)
      ),
    [contractLanes, groupId]
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
        <PostGroupLaneFormBody
          title={title}
          description={description}
          groupId={groupId}
          isPermittedLane={isPermittedLane}
          lanesAvailableForSelection={lanesAvailableForSelection}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
