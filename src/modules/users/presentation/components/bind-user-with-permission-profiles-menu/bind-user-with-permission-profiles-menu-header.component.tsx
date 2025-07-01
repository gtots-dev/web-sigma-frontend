import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface BindUserWithPermissionProfilesMenuHeaderComponentProps {
  title: string
  description: string
}

export function BindUserWithPermissionProfilesMenuHeaderComponent({
  title,
  description
}: BindUserWithPermissionProfilesMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
