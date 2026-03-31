import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostVehicleMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostVehicleMenuHeaderComponent({
  title,
  description
}: PostVehicleMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
