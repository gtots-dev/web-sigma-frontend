'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchViolationMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchViolationMenuHeaderComponent({
  title,
  description
}: PatchViolationMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
