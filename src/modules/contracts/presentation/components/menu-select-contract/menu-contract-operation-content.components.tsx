import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface MenuSelectContractContentComponentProps {
  title: string
  description: string
  children: ReactNode
}

export function MenuSelectContractContentComponent({
  title,
  description,
  children
}: MenuSelectContractContentComponentProps) {
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
