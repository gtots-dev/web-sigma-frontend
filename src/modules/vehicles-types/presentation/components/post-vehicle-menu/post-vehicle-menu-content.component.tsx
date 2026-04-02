import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostVehicleMenuContentComponentProps {
  children: ReactNode
}

export function PostVehicleMenuContentComponent({
  children
}: PostVehicleMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
