import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMoreActivityReportMenuContentComponentProps {
  children: ReactNode
}

export function ViewMoreActivityReportMenuContentComponent({
  children
}: ViewMoreActivityReportMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
