import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './view-more-activity-report-menu-provider.component'

interface ViewMoreActivityReportMenuRootComponentProps {
  children: ReactNode
}

export function ViewMoreActivityReportMenuRootComponent({
  children
}: ViewMoreActivityReportMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
