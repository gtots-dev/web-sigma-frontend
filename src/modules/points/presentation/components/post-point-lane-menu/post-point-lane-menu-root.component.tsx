'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostPointLaneForm } from '../../hooks/use-post-point-lane-form.hook'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

interface PostPointLaneMenuRootComponentProps {
  pointId: PointEntity['id']
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostPointLaneMenuRootComponent({
  pointId,
  children,
  isOpen,
  close
}: PostPointLaneMenuRootComponentProps) {
  const { methods, defaultValues } = usePostPointLaneForm(pointId)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <FormProvider {...methods}>
      <DrawerDialog.Root open={isOpen} onOpenChange={close}>
        {children}
      </DrawerDialog.Root>
    </FormProvider>
  )
}
