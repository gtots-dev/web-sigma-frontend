'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-lane-menu-provider.component'
import { EditLaneMenu } from '.'
import { useTableLane } from '../../contexts/table-lanes.context'
import { useEditLaneSubmit } from '../../hooks/use-edit-lane-submit.hook'
import { LaneForm } from '../lane-form'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

interface EditLaneMenuComponentProps {
  title: string
  description: string
}

export function EditLaneMenuComponent({
  title,
  description
}: EditLaneMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const lane = useTableLane()
  const { onAction } = useEditLaneSubmit()

  return (
    <EditLaneMenu.Root
      lane={lane}
      isOpen={isOpen}
      close={close}
    >
      <EditLaneMenu.Content>
        <EditLaneMenu.Header
          title={title}
          description={description}
        />
        <LaneForm.Form>
          <LaneForm.Input.Name />
          <LaneForm.Input.cfg />
        </LaneForm.Form>

        <EditLaneMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <LaneForm.Submit
            onSubmit={(lane: LaneEntity) =>
              onAction(lane, close)
            }
          />
        </EditLaneMenu.Footer>
      </EditLaneMenu.Content>
    </EditLaneMenu.Root>
  )
}
