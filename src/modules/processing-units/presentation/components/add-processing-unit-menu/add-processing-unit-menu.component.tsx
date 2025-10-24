'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { AddProcessingUnitMenu } from '.'
import { useAddProcessingUnitSubmit } from '../../hooks/use-add-processing-unit-submit.hook'
import { useDialog } from './add-processing-unit-menu-provider.component'
import { ProcessingUnitForm } from '../processing-unit-form'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

interface AddProcessingUnitMenuComponentProps {
  title: string
  description: string
}

export function AddProcessingUnitMenuComponent({
  title,
  description
}: AddProcessingUnitMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddProcessingUnitSubmit()

  return (
    <AddProcessingUnitMenu.Root isOpen={isOpen} close={close}>
      <AddProcessingUnitMenu.Content>
        <AddProcessingUnitMenu.Header title={title} description={description} />
        <ProcessingUnitForm.Form>
          <ProcessingUnitForm.Input.Name require />
          <ProcessingUnitForm.Input.cfg />
        </ProcessingUnitForm.Form>

        <AddProcessingUnitMenu.Footer>
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
        </AddProcessingUnitMenu.Footer>
      </AddProcessingUnitMenu.Content>
    </AddProcessingUnitMenu.Root>
  )
}
