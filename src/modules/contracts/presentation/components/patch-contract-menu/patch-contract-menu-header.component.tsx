import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PatchContractMenuHeaderComponentProps {
  title: string
  description: string
}

export function PatchContractMenuHeaderComponent({
  title,
  description
}: PatchContractMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
