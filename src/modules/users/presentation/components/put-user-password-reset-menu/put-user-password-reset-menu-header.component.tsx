import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PutUserPasswordResetMenuHeaderComponentProps {
  title: string
  description: string
}

export function PutUserPasswordResetMenuHeaderComponent({
  title,
  description
}: PutUserPasswordResetMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
