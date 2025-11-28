import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostPointLaneMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostPointLaneMenuHeaderComponent({
  title,
  description
}: PostPointLaneMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
