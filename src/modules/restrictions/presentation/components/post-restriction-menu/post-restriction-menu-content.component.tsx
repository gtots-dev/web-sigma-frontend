'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostRestrictionMenuContentComponentProps {
  children: ReactNode
}

export function PostRestrictionMenuContentComponent({
  children
}: PostRestrictionMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
