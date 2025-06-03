import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface AddContractMenuHeaderComponentProps {
  title: string
  description: string
}

export function AddContractMenuHeaderComponent({
  title,
  description
}: AddContractMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
