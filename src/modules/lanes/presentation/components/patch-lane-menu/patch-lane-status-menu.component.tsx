'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchLaneStatusMenu } from '.'
import { useDialog } from './patch-lane-status-menu-provider.component'
import { usePatchLaneStatusSubmit } from '../../hooks/use-patch-lane-status-submit.hook'
import { LaneForm } from '../lane-form'
import { useTableLane } from '../../contexts/table-lanes.context'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

interface PatchLaneStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchLaneStatusMenuComponent({
  title,
  description
}: PatchLaneStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePatchLaneStatusSubmit()
  const { id, enabled } = useTableLane()

  return (
    <PatchLaneStatusMenu.Root
      lane={{ id, enabled }}
      close={close}
      isOpen={isOpen}
    >
      <PatchLaneStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchLaneStatusMenu.Header title={title} description={description} />

        <LaneForm.Form>
          <LaneForm.Input.Enabled />
        </LaneForm.Form>

        <PatchLaneStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <LaneForm.Submit<LaneEnableAndDisableInterface>
            onSubmit={(laneStatus: LaneEnableAndDisableInterface) =>
              onAction(laneStatus, close)
            }
          />
        </PatchLaneStatusMenu.Footer>
      </PatchLaneStatusMenu.Content>
    </PatchLaneStatusMenu.Root>
  )
}
