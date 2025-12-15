'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchGroupMenu } from '.'
import { GroupForm } from '../group-form'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'
import { usePatchGroupSubmit } from '../../hooks/use-patch-group-submit.hook'
import { usePatchGroupMenuContext } from '../../contexts/patch-group-menu.context'
import { useTableGroup } from '../../contexts/table-group.context'

interface PatchGroupMenuComponentProps {
  title: string
  description: string
}

export function PatchGroupMenuComponent({
  title,
  description
}: PatchGroupMenuComponentProps) {
  const { isOpen, close } = usePatchGroupMenuContext()
  const { group } = useTableGroup()
  const { onAction } = usePatchGroupSubmit()

  return (
    <PatchGroupMenu.Root isOpen={isOpen} close={close} group={group}>
      <PatchGroupMenu.Content>
        <PatchGroupMenu.Header title={title} description={description} />
        <GroupForm.Form>
          <GroupForm.Input.Name require />
          <GroupForm.Input.Description />
          <GroupForm.Input.cfg />
        </GroupForm.Form>

        <PatchGroupMenu.Footer>
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
        </PatchGroupMenu.Footer>
      </PatchGroupMenu.Content>
    </PatchGroupMenu.Root>
  )
}
