import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface EditPermissionProfileMenuHeaderComponentProps {
  title: string
  description: string
}

export function EditPermissionProfileMenuHeaderComponent({
  title,
  description
}: EditPermissionProfileMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
