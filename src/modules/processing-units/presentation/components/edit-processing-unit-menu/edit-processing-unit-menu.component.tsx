'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-processing-unit-menu-provider.component'
import { EditProcessingUnitsMenu } from '.'
import { useTableProcessingUnit } from '../../contexts/table-processing-units.context'
import { useEditProcessingUnitSubmit } from '../../hooks/use-edit-processing-unit-submit.hook'
import { ProcessingUnitForm } from '../processing-unit-form'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

interface EditProcessingUnitsMenuComponentProps {
  title: string
  description: string
}

export function EditProcessingUnitsMenuComponent({
  title,
  description
}: EditProcessingUnitsMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const processingUnit = useTableProcessingUnit()
  const { onAction } = useEditProcessingUnitSubmit()

  return (
    <EditProcessingUnitsMenu.Root
      processingUnit={processingUnit}
      isOpen={isOpen}
      close={close}
    >
      <EditProcessingUnitsMenu.Content>
        <EditProcessingUnitsMenu.Header
          title={title}
          description={description}
        />
        <ProcessingUnitForm.Form>
          <ProcessingUnitForm.Input.Name />
          <ProcessingUnitForm.Input.cfg />
        </ProcessingUnitForm.Form>

        <EditProcessingUnitsMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ProcessingUnitForm.Submit
            onSubmit={(processingUnit: ProcessingUnitEntity) =>
              onAction(processingUnit, close)
            }
          />
        </EditProcessingUnitsMenu.Footer>
      </EditProcessingUnitsMenu.Content>
    </EditProcessingUnitsMenu.Root>
  )
}
