import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchPointStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchPointStatusMenuHeaderComponent({
  title,
  description
}: PatchPointStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
