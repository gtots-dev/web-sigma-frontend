import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PutContractStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PutContractStatusMenuHeaderComponent({
  title,
  description
}: PutContractStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
