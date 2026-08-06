'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchRestrictionMenuContentComponentProps {
  children: ReactNode
}

export function PatchRestrictionMenuContentComponent({
  children
}: PatchRestrictionMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
