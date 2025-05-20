import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface AddUserMenuHeaderComponentProps {
  title: string
  description: string
}

export function AddUserMenuHeaderComponent({
  title,
  description
}: AddUserMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
