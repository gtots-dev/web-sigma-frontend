import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ActivityReportFiltersDropdownRootComponentProps
  extends DropdownMenuProps {
  children: ReactNode
}

export function ActivityReportFiltersDropdownRootComponent({
  children,
  ...props
}: ActivityReportFiltersDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
