import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface EditUserMenuHeaderComponentProps {
  title: string
  description: string
}

export function EditUserMenuHeaderComponent({
  title,
  description
}: EditUserMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
