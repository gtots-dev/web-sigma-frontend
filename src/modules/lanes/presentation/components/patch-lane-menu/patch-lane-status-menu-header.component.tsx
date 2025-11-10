import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchLaneStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchLaneStatusMenuHeaderComponent({
  title,
  description
}: PatchLaneStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
