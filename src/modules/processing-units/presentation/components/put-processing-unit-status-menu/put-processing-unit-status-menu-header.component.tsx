import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PutProcessingUnitsStatusMenuHeaderComponentProps {
  title: string
  description: string
}

export function PutProcessingUnitsStatusMenuHeaderComponent({
  title,
  description
}: PutProcessingUnitsStatusMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
