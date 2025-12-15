import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostGroupLaneMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostGroupLaneMenuHeaderComponent({
  title,
  description
}: PostGroupLaneMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
