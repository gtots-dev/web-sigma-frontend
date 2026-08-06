'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchViolationMenuContentComponentProps {
  children: ReactNode
}

export function PatchViolationMenuContentComponent({
  children
}: PatchViolationMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
