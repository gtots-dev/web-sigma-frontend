'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostPointLaneMenu } from '.'
import { PointForm } from '../point-form'
import { useTablePoint } from '../../contexts/table-point.context'
import { usePostPointLaneMenuContext } from '../../contexts/post-point-lane-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { usePostPointLaneSubmit } from '../../hooks/use-post-point-lane-submit.hook'
import type { PointLaneInterface } from '@/modules/points/domain/interfaces/point-lane.interface'
import { useMemo } from 'react'

interface PostPointLaneMenuComponentProps {
  title: string
  description: string
  isPermittedLane: boolean
}

export function PostPointLaneMenuComponent({
  title,
  description,
  isPermittedLane
}: PostPointLaneMenuComponentProps) {
  const { isOpen, close } = usePostPointLaneMenuContext()
  const { point } = useTablePoint()
  const { contractLanes } = useLaneStore()
  const { onAction } = usePostPointLaneSubmit()

  const lanesAvailableForSelection = useMemo(
    () =>
      contractLanes.filter(
        (laneItem) =>
          laneItem.point_id === null || laneItem.point_id === point.id
      ),
    [contractLanes, point.id]
  )

  return (
    <PostPointLaneMenu.Root isOpen={isOpen} close={close} pointId={point.id}>
      <PostPointLaneMenu.Content>
        <PostPointLaneMenu.Header title={title} description={description} />

        <PointForm.Form>
          <PointForm.Input.Lanes
            lanes={lanesAvailableForSelection}
            hasPermission={isPermittedLane}
          />
        </PointForm.Form>

        <PostPointLaneMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <PointForm.Submit<PointLaneInterface>
            onSubmit={(laneId: PointLaneInterface) => onAction(laneId, close)}
          />
        </PostPointLaneMenu.Footer>
      </PostPointLaneMenu.Content>
    </PostPointLaneMenu.Root>
  )
}
