import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface AddPermissionProfileMenuHeaderComponentProps {
  title: string
  description: string
}

export function AddPermissionProfileMenuHeaderComponent({
  title,
  description
}: AddPermissionProfileMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
