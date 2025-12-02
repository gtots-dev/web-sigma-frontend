import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface ViewMorePointMenuHeaderComponentProps {
  title: string
  description: string
}

export function ViewMorePointMenuHeaderComponent({
  title,
  description
}: ViewMorePointMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
