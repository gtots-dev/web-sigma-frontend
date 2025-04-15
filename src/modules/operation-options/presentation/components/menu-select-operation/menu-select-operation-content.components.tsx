import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface MenuSelectOperationContentComponentProps {
  title: string
  description: string
  children: ReactNode
}

export function MenuSelectOperationContentComponent({
  title,
  description,
  children
}: MenuSelectOperationContentComponentProps) {
  return (
    <DrawerDialog.Content>
      <DrawerDialog.Header>
        <DrawerDialog.Title>{title}</DrawerDialog.Title>
        <DrawerDialog.Description>{description}</DrawerDialog.Description>
      </DrawerDialog.Header>
      {children}
    </DrawerDialog.Content>
  )
}
