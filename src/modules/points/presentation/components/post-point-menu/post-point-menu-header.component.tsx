import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostPointMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostPointMenuHeaderComponent({
  title,
  description
}: PostPointMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
