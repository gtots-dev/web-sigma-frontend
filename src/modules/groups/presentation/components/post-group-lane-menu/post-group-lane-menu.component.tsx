'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostGroupLaneMenu } from '.'
import { GroupForm } from '../group-form'
import { useTableGroup } from '../../contexts/table-group.context'
import { usePostGroupLaneMenuContext } from '../../contexts/post-group-lane-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { usePostGroupLaneSubmit } from '../../hooks/use-post-group-lane-submit.hook'
import type { GroupLaneInterface } from '@/modules/groups/domain/interfaces/group-lane.interface'
import { useMemo } from 'react'

interface PostGroupLaneMenuComponentProps {
  title: string
  description: string
}

export function PostGroupLaneMenuComponent({
  title,
  description
}: PostGroupLaneMenuComponentProps) {
  const { isOpen, close } = usePostGroupLaneMenuContext()
  const { group } = useTableGroup()
  const { contractLanes } = useLaneStore()
  const { onAction } = usePostGroupLaneSubmit()

  const lanesAvailableForSelection = useMemo(() => {
    return contractLanes.filter(
      (laneItem) =>
        laneItem.group_id.length === 0 || laneItem.group_id.includes(group.id)
    )
  }, [contractLanes, group.id])

  return (
    <PostGroupLaneMenu.Root isOpen={isOpen} close={close} groupId={group.id}>
      <PostGroupLaneMenu.Content>
        <PostGroupLaneMenu.Header title={title} description={description} />

        <GroupForm.Form>
          <GroupForm.Input.Lanes lanes={lanesAvailableForSelection} />
        </GroupForm.Form>

        <PostGroupLaneMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <GroupForm.Submit<GroupLaneInterface>
            onSubmit={(laneId: GroupLaneInterface) => onAction(laneId, close)}
          />
        </PostGroupLaneMenu.Footer>
      </PostGroupLaneMenu.Content>
    </PostGroupLaneMenu.Root>
  )
}
