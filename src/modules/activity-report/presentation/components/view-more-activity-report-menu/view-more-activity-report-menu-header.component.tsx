import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

interface ViewMoreActivityReportMenuHeaderComponentProps {
  title: string
  description: string
}

export function ViewMoreActivityReportMenuHeaderComponent({
  title,
  description
}: ViewMoreActivityReportMenuHeaderComponentProps) {
  return (
    <DrawerDialog.Header>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
    </DrawerDialog.Header>
  )
}
