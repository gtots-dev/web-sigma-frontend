import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface ViewMoreGroupMenuHeaderComponentProps {
  title: string
  description: string
}

export function ViewMoreGroupMenuHeaderComponent({
  title,
  description
}: ViewMoreGroupMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
