import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface AddLaneMenuHeaderComponentProps {
  title: string
  description: string
}

export function AddLaneMenuHeaderComponent({
  title,
  description
}: AddLaneMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
