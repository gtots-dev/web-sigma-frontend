import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchProcessingUnitsStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchProcessingUnitsStatusMenuHeaderComponent({
  title,
  description
}: PatchProcessingUnitsStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
