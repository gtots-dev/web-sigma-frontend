import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface EditProcessingUnitsMenuHeaderComponentProps {
  title: string
  description: string
}

export function EditProcessingUnitsMenuHeaderComponent({
  title,
  description
}: EditProcessingUnitsMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
