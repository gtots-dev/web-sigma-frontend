import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchVehicleTypeMenuContentComponentProps {
  children: ReactNode
}

export function PatchVehicleTypeMenuContentComponent({
  children
}: PatchVehicleTypeMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
