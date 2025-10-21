import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface EditLaneMenuHeaderComponentProps {
  title: string
  description: string
}

export function EditLaneMenuHeaderComponent({
  title,
  description
}: EditLaneMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
