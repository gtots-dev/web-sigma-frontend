'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchGroupStatusMenu } from '.'
import { GroupForm } from '../group-form'
import type { GroupEnableAndDisableInterface } from '@/modules/groups/domain/interfaces/group-enable-and-disable.interface'
import { useTableGroup } from '../../contexts/table-group.context'
import { usePatchGroupStatusMenuContext } from '../../contexts/patch-group-status-menu.context'
import { usePatchGroupStatusSubmit } from '../../hooks/use-patch-group-status-submit.hook'

interface PatchGroupStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchGroupStatusMenuComponent({
  title,
  description
}: PatchGroupStatusMenuComponentProps) {
  const { isOpen, close } = usePatchGroupStatusMenuContext()
  const {
    group: { id, enabled }
  } = useTableGroup()
  const { onAction } = usePatchGroupStatusSubmit()

  return (
    <PatchGroupStatusMenu.Root
      group={{ id, enabled }}
      close={close}
      isOpen={isOpen}
    >
      <PatchGroupStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchGroupStatusMenu.Header title={title} description={description} />

        <GroupForm.Form>
          <GroupForm.Input.Enabled />
        </GroupForm.Form>

        <PatchGroupStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <GroupForm.Submit<GroupEnableAndDisableInterface>
            onSubmit={(group: GroupEnableAndDisableInterface) =>
              onAction(group, close)
            }
          />
        </PatchGroupStatusMenu.Footer>
      </PatchGroupStatusMenu.Content>
    </PatchGroupStatusMenu.Root>
  )
}
