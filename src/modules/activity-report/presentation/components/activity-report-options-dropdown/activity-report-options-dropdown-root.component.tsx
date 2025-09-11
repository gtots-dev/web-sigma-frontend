import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ActivityReportOptionsDropdownRootComponentProps
  extends DropdownMenuProps {
  children: ReactNode
}

export function ActivityReportOptionsDropdownRootComponent({
  children,
  ...props
}: ActivityReportOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
