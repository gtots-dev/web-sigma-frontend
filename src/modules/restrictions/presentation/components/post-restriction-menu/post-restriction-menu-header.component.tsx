'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostRestrictionMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostRestrictionMenuHeaderComponent({
  title,
  description
}: PostRestrictionMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
