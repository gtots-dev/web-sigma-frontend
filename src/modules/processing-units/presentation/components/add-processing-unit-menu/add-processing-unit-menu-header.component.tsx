import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface AddProcessingUnitMenuHeaderComponentProps {
  title: string
  description: string
}

export function AddProcessingUnitMenuHeaderComponent({
  title,
  description
}: AddProcessingUnitMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
