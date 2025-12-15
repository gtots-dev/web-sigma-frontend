import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface PostGroupSubgroupMenuHeaderComponentProps {
  title: string
  description: string
}

export function PostGroupSubgroupMenuHeaderComponent({
  title,
  description
}: PostGroupSubgroupMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
