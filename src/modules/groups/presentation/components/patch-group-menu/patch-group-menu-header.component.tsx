import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchGroupMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchGroupMenuHeaderComponent({
  title,
  description
}: PatchGroupMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
