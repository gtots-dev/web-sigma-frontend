'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchProcessingUnitStatusForm } from '../../hooks/use-patch-processing-unit-status-form.hook'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

interface PatchProcessingUnitsStatusMenuRootComponentProps {
  processingUnit: ProcessingUnitEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchProcessingUnitsStatusMenuRootComponent({
  processingUnit,
  children,
  isOpen,
  close
}: PatchProcessingUnitsStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchProcessingUnitStatusForm(processingUnit)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <DrawerDialog.Root open={isOpen} onOpenChange={close}>
          {children}
        </DrawerDialog.Root>
      </FormProvider>
    </SmartFormProvider>
  )
}
