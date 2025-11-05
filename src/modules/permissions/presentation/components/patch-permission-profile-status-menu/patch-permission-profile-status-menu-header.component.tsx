import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchPermissionProfileStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchPermissionProfileStatusMenuHeaderComponent({
  title,
  description
}: PatchPermissionProfileStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
