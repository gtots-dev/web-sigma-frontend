'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchPointMenu } from '.'
import { PointForm } from '../point-form'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import { usePatchPointSubmit } from '../../hooks/use-patch-point-submit.hook'
import { usePatchPointMenuContext } from '../../contexts/patch-point-menu.context'
import { useTablePoint } from '../../contexts/table-point.context'

interface PatchPointMenuComponentProps {
  title: string
  description: string
}

export function PatchPointMenuComponent({
  title,
  description
}: PatchPointMenuComponentProps) {
  const { isOpen, close } = usePatchPointMenuContext()
  const { point } = useTablePoint()
  const { onAction } = usePatchPointSubmit()

  return (
    <PatchPointMenu.Root isOpen={isOpen} close={close} point={point}>
      <PatchPointMenu.Content>
        <PatchPointMenu.Header title={title} description={description} />
        <PointForm.Form>
          <PointForm.Input.Name require />
          <PointForm.Input.Description />
          <PointForm.Input.cfg />
        </PointForm.Form>

        <PatchPointMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <PointForm.Submit<PointEntity>
            onSubmit={(point: PointEntity) => onAction(point, close)}
          />
        </PatchPointMenu.Footer>
      </PatchPointMenu.Content>
    </PatchPointMenu.Root>
  )
}
