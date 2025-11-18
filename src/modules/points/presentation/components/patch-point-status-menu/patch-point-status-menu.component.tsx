'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchPointStatusMenu } from '.'
import { PointForm } from '../point-form'

import type { PointEnableAndDisableInterface } from '@/modules/points/domain/interfaces/point-enable-and-disable.interface'
import { useTablePoint } from '../../contexts/table-point.context'
import { usePatchPointStatusMenuContext } from '../../contexts/patch-point-status-menu.context'
import { usePatchPointStatusSubmit } from '../../hooks/use-patch-point-status-submit.hook'

interface PatchPointStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchPointStatusMenuComponent({
  title,
  description
}: PatchPointStatusMenuComponentProps) {
  const { isOpen, close } = usePatchPointStatusMenuContext()
  const { id, enabled } = useTablePoint()
  const { onAction } = usePatchPointStatusSubmit()

  return (
    <PatchPointStatusMenu.Root
      point={{ id, enabled }}
      close={close}
      isOpen={isOpen}
    >
      <PatchPointStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchPointStatusMenu.Header title={title} description={description} />

        <PointForm.Form>
          <PointForm.Input.Enabled />
        </PointForm.Form>

        <PatchPointStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <PointForm.Submit<PointEnableAndDisableInterface>
            onSubmit={(point: PointEnableAndDisableInterface) =>
              onAction(point, close)
            }
          />
        </PatchPointStatusMenu.Footer>
      </PatchPointStatusMenu.Content>
    </PatchPointStatusMenu.Root>
  )
}
