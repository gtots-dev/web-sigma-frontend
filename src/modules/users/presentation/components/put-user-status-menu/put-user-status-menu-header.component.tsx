import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PutUserStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PutUserStatusMenuHeaderComponent({
  title,
  description
}: PutUserStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
