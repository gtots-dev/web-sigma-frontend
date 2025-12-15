'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostGroupSubgroupMenu } from '.'
import { GroupForm } from '../group-form'
import { useTableGroup } from '../../contexts/table-group.context'
import { usePostGroupSubgroupSubmit } from '../../hooks/use-post-group-subgroup-submit.hook'
import { useMemo } from 'react'
import { useGroupStore } from '../../stores/group.store'
import { usePostGroupSubgroupMenuContext } from '../../contexts/post-group-subgroup-menu.context'
import type { GroupSubgroupInterface } from '@/modules/groups/domain/interfaces/group-subgroup.interface'

interface PostGroupSubgroupMenuComponentProps {
  title: string
  description: string
}

export function PostGroupSubgroupMenuComponent({
  title,
  description
}: PostGroupSubgroupMenuComponentProps) {
  const { isOpen, close } = usePostGroupSubgroupMenuContext()
  const { group } = useTableGroup()
  const { groups: subgroups } = useGroupStore()
  const { onAction } = usePostGroupSubgroupSubmit()

  const subgroupsAvailableForSelection = useMemo(() => {
    return subgroups.filter(
      (subgroupItem) => subgroupItem.group.id !== group.id
    )
  }, [subgroups, group.id])

  return (
    <PostGroupSubgroupMenu.Root
      isOpen={isOpen}
      close={close}
      groupId={group.id}
    >
      <PostGroupSubgroupMenu.Content>
        <PostGroupSubgroupMenu.Header title={title} description={description} />

        <GroupForm.Form>
          <GroupForm.Input.Subgroups
            subgroups={subgroupsAvailableForSelection}
          />
        </GroupForm.Form>

        <PostGroupSubgroupMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>

          <GroupForm.Submit<GroupSubgroupInterface>
            onSubmit={(subgroupId: GroupSubgroupInterface) =>
              onAction(subgroupId, close)
            }
          />
        </PostGroupSubgroupMenu.Footer>
      </PostGroupSubgroupMenu.Content>
    </PostGroupSubgroupMenu.Root>
  )
}
