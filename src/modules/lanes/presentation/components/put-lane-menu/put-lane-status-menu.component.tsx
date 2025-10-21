'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PutLaneStatusMenu } from '.'
import { useDialog } from './put-lane-status-menu-provider.component'
import { usePutLaneStatusSubmit } from '../../hooks/use-put-lane-status-submit.hook'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { LaneForm } from '../lane-form'
import { useTableLane } from '../../contexts/table-lanes.context'


interface PutLaneStatusMenuComponentProps {
  title: string
  description: string
}

export function PutLaneStatusMenuComponent({
  title,
  description
}: PutLaneStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutLaneStatusSubmit()
  const lane = useTableLane()

  return (
    <PutLaneStatusMenu.Root
      lane={lane}
      close={close}
      isOpen={isOpen}
    >
      <PutLaneStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutLaneStatusMenu.Header title={title} description={description} />

        <LaneForm.Form>
          <LaneForm.Input.Enabled />
        </LaneForm.Form>

        <PutLaneStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <LaneForm.Submit
            onSubmit={(laneStatus: LaneEntity) =>
              onAction(laneStatus, close)
            }
          />
        </PutLaneStatusMenu.Footer>
      </PutLaneStatusMenu.Content>
    </PutLaneStatusMenu.Root>
  )
}
