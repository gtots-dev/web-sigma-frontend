import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchVehicleTypeMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchVehicleTypeMenuHeaderComponent({
  title,
  description
}: PatchVehicleTypeMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
