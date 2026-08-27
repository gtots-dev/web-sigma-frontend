'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchViolationForm } from '../../hooks/use-patch-violation-form.hook'
import type { ViolationEntity } from '@/modules/violations/domain/entities/violation.entity'

interface PatchViolationMenuRootComponentProps {
  violation: ViolationEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchViolationMenuRootComponent({
  violation,
  children,
  isOpen,
  close
}: PatchViolationMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchViolationForm(violation)

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
