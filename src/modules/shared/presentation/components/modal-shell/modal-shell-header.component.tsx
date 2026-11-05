'use client'

import type { ReactNode } from 'react'
import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface ModalShellHeaderProps {
  title: ReactNode
  description: ReactNode
  className?: string
}

export function ModalShellHeader({
  title,
  description,
  className
}: ModalShellHeaderProps) {
  return (
    <DrawerDialog.Header className={className}>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
