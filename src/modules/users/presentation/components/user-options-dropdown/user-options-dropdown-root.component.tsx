import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface UserOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function UserOptionsDropdownRootComponent({
  children,
  ...props
}: UserOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
