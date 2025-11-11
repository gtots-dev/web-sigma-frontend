'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchProcessingUnitsStatusMenu } from '.'
import { useDialog } from './patch-processing-unit-status-menu-provider.component'
import { usePatchProcessingUnitStatusSubmit } from '../../hooks/use-patch-processing-unit-status-submit.hook'
import { ProcessingUnitForm } from '../processing-unit-form'
import { useTableProcessingUnit } from '../../contexts/table-processing-units.context'
import type { ProcessingUnitEnableAndDisableInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-enable-and-disable.interface'

interface PatchProcessingUnitsStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchProcessingUnitsStatusMenuComponent({
  title,
  description
}: PatchProcessingUnitsStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePatchProcessingUnitStatusSubmit()
  const processingUnit = useTableProcessingUnit()

  return (
    <PatchProcessingUnitsStatusMenu.Root
      processingUnit={processingUnit}
      close={close}
      isOpen={isOpen}
    >
      <PatchProcessingUnitsStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchProcessingUnitsStatusMenu.Header
          title={title}
          description={description}
        />

        <ProcessingUnitForm.Form>
          <ProcessingUnitForm.Input.Enabled />
        </ProcessingUnitForm.Form>

        <PatchProcessingUnitsStatusMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <ProcessingUnitForm.Submit<ProcessingUnitEnableAndDisableInterface>
            onSubmit={(
              processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
            ) => onAction(processingUnitEnableAndDisable, close)}
          />
        </PatchProcessingUnitsStatusMenu.Footer>
      </PatchProcessingUnitsStatusMenu.Content>
    </PatchProcessingUnitsStatusMenu.Root>
  )
}
