'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostGroupMenu } from '.'
import { GroupForm } from '../group-form'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'
import { usePostGroupSubmit } from '../../hooks/use-post-group-submit.hook'
import { usePostGroupMenuContext } from '../../contexts/post-group-menu.context'

interface PostGroupMenuComponentProps {
  title: string
  description: string
}

export function PostGroupMenuComponent({
  title,
  description
}: PostGroupMenuComponentProps) {
  const { isOpen, close } = usePostGroupMenuContext()
  const { onAction } = usePostGroupSubmit()

  return (
    <PostGroupMenu.Root isOpen={isOpen} close={close}>
      <PostGroupMenu.Content>
        <PostGroupMenu.Header title={title} description={description} />
        <GroupForm.Form>
          <GroupForm.Input.Name require />
          <GroupForm.Input.Description />
          <GroupForm.Input.cfg />
        </GroupForm.Form>

        <PostGroupMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <GroupForm.Submit<GroupEntity>
            onSubmit={(group: GroupEntity) => onAction(group, close)}
          />
        </PostGroupMenu.Footer>
      </PostGroupMenu.Content>
    </PostGroupMenu.Root>
  )
}
