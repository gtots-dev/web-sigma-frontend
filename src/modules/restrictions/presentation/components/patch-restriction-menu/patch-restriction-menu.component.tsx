'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchRestrictionMenu } from '.'
import { usePatchRestrictionMenuContext } from '../../contexts/patch-restriction-menu.context'
import { useTableRestrictions } from '../../contexts/table-restrictions.context'
import { usePatchRestrictionSubmit } from '../../hooks/use-patch-restriction-submit.hook'
import { RestrictionForm } from '../restriction-form'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

interface PatchRestrictionMenuComponentProps {
  title: string
  description: string
}

export function PatchRestrictionMenuComponent({
  title,
  description
}: PatchRestrictionMenuComponentProps) {
  const { isOpen, close } = usePatchRestrictionMenuContext()
  const restriction = useTableRestrictions()
  const { onAction } = usePatchRestrictionSubmit()

  return (
    <PatchRestrictionMenu.Root
      isOpen={isOpen}
      close={close}
      restriction={restriction}
    >
      <PatchRestrictionMenu.Content>
        <PatchRestrictionMenu.Header title={title} description={description} />
        <RestrictionForm.Form>
          <RestrictionForm.Input.Name require />
          <RestrictionForm.Input.Code require />
          <RestrictionForm.Input.ColorPicker
            name="color"
            label="Cor da restrição"
            require
          />
        </RestrictionForm.Form>

        <PatchRestrictionMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <RestrictionForm.Submit<RestrictionEntity>
            onSubmit={(data: RestrictionEntity) => onAction(data, close)}
          />
        </PatchRestrictionMenu.Footer>
      </PatchRestrictionMenu.Content>
    </PatchRestrictionMenu.Root>
  )
}
