'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { AddLaneMenu } from '.'
import { useAddLaneSubmit } from '../../hooks/use-add-lane-submit.hook'
import { useDialog } from './add-lane-menu-provider.component'
import { LaneForm } from '../lane-form'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

interface AddLaneMenuComponentProps {
  title: string
  description: string
}

export function AddLaneMenuComponent({
  title,
  description
}: AddLaneMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddLaneSubmit()

  return (
    <AddLaneMenu.Root isOpen={isOpen} close={close}>
      <AddLaneMenu.Content>
        <AddLaneMenu.Header title={title} description={description} />
        <LaneForm.Form>
          <LaneForm.Input.Name require />
          <LaneForm.Input.cfg />
        </LaneForm.Form>

        <AddLaneMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <LaneForm.Submit
            onSubmit={(lane: LaneEntity) => onAction(lane, close)}
          />
        </AddLaneMenu.Footer>
      </AddLaneMenu.Content>
    </AddLaneMenu.Root>
  )
}
