'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PutProcessingUnitsStatusMenu } from '.'
import { useDialog } from './put-processing-unit-status-menu-provider.component'
import { usePutProcessingUnitStatusSubmit } from '../../hooks/use-put-processing-unit-status-submit.hook'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { ProcessingUnitForm } from '../processing-unit-form'
import { useTableProcessingUnit } from '../../contexts/table-processing-units.context'


interface PutProcessingUnitsStatusMenuComponentProps {
  title: string
  description: string
}

export function PutProcessingUnitsStatusMenuComponent({
  title,
  description
}: PutProcessingUnitsStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutProcessingUnitStatusSubmit()
  const processingUnit = useTableProcessingUnit()

  return (
    <PutProcessingUnitsStatusMenu.Root
      processingUnit={processingUnit}
      close={close}
      isOpen={isOpen}
    >
      <PutProcessingUnitsStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutProcessingUnitsStatusMenu.Header title={title} description={description} />

        <ProcessingUnitForm.Form>
          <ProcessingUnitForm.Input.Enabled />
        </ProcessingUnitForm.Form>

        <PutProcessingUnitsStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ProcessingUnitForm.Submit
            onSubmit={(processingUnitStatus: ProcessingUnitEntity) =>
              onAction(processingUnitStatus, close)
            }
          />
        </PutProcessingUnitsStatusMenu.Footer>
      </PutProcessingUnitsStatusMenu.Content>
    </PutProcessingUnitsStatusMenu.Root>
  )
}
