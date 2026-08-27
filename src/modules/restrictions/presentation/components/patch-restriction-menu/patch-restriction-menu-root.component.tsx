'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchRestrictionForm } from '../../hooks/use-patch-restriction-form.hook'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

interface PatchRestrictionMenuRootComponentProps {
  restriction: RestrictionEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchRestrictionMenuRootComponent({
  restriction,
  children,
  isOpen,
  close
}: PatchRestrictionMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchRestrictionForm(restriction)

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
