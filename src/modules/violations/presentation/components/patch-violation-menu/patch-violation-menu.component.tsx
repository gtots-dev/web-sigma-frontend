'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchViolationMenu } from '.'
import { usePatchViolationMenuContext } from '../../contexts/patch-violation-menu.context'
import { useTableViolations } from '../../contexts/table-violations.context'
import { usePatchViolationSubmit } from '../../hooks/use-patch-violation-submit.hook'
import { ViolationForm } from '../violation-form'
import type { ViolationEntity } from '@/modules/violations/domain/entities/violation.entity'

interface PatchViolationMenuComponentProps {
  title: string
  description: string
}

export function PatchViolationMenuComponent({
  title,
  description
}: PatchViolationMenuComponentProps) {
  const { isOpen, close } = usePatchViolationMenuContext()
  const violation = useTableViolations()
  const { onAction } = usePatchViolationSubmit()

  return (
    <PatchViolationMenu.Root
      isOpen={isOpen}
      close={close}
      violation={violation}
    >
      <PatchViolationMenu.Content>
        <PatchViolationMenu.Header title={title} description={description} />
        <ViolationForm.Form>
          <ViolationForm.Input.Name />
          <ViolationForm.Input.Code />
          <ViolationForm.Input.ColorPicker
            name="color"
            label="Cor da violação"
            require
          />
        </ViolationForm.Form>

        <PatchViolationMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ViolationForm.Submit<ViolationEntity>
            onSubmit={(violation: ViolationEntity) =>
              onAction(violation, close)
            }
          />
        </PatchViolationMenu.Footer>
      </PatchViolationMenu.Content>
    </PatchViolationMenu.Root>
  )
}
