'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchRestrictionMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchRestrictionMenuHeaderComponent({
  title,
  description
}: PatchRestrictionMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
