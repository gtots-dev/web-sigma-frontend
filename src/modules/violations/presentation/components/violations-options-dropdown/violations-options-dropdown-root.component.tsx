import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ViolationsOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function ViolationsOptionsDropdownRootComponent({
  children,
  ...props
}: ViolationsOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
