import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface GroupOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function GroupOptionsDropdownRootComponent({
  children,
  ...props
}: GroupOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
