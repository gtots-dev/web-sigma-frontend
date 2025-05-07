import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface UserDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function UserDropdownRootComponent({
  children,
  ...props
}: UserDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
