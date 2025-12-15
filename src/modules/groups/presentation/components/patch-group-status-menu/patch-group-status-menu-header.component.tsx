import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchGroupStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchGroupStatusMenuHeaderComponent({
  title,
  description
}: PatchGroupStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
