import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface InfractionsMenuHeaderComponentProps {
  title: string
  description: string
}

export function InfractionsMenuHeaderComponent({
  title,
  description
}: InfractionsMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
