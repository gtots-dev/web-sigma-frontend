'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostGroupPointMenu } from '.'
import { GroupForm } from '../group-form'
import { useTableGroup } from '../../contexts/table-group.context'
import { usePostGroupPointMenuContext } from '../../contexts/post-group-point-menu.context'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { usePostGroupPointSubmit } from '../../hooks/use-post-group-point-submit.hook'
import type { GroupPointInterface } from '@/modules/groups/domain/interfaces/group-point.interface'
import { useMemo } from 'react'

interface PostGroupPointMenuComponentProps {
  title: string
  description: string
}

export function PostGroupPointMenuComponent({
  title,
  description
}: PostGroupPointMenuComponentProps) {
  const { isOpen, close } = usePostGroupPointMenuContext()
  const { group } = useTableGroup()
  const { points } = usePointStore()
  const { onAction } = usePostGroupPointSubmit()

  const pointsAvailableForSelection = useMemo(() => {
    return points.filter(
      (pointItem) =>
        pointItem.group_id.length === 0 || pointItem.group_id.includes(group.id)
    )
  }, [points, group.id])

  return (
    <PostGroupPointMenu.Root isOpen={isOpen} close={close} groupId={group.id}>
      <PostGroupPointMenu.Content>
        <PostGroupPointMenu.Header title={title} description={description} />

        <GroupForm.Form>
          <GroupForm.Input.Points points={pointsAvailableForSelection} />
        </GroupForm.Form>

        <PostGroupPointMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <GroupForm.Submit<GroupPointInterface>
            onSubmit={(pointId: GroupPointInterface) => onAction(pointId, close)}
          />
        </PostGroupPointMenu.Footer>
      </PostGroupPointMenu.Content>
    </PostGroupPointMenu.Root>
  )
}
