'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface ModalShellHeaderProps {
  title: string
  description: string
}

export function ModalShellHeader({ title, description }: ModalShellHeaderProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
