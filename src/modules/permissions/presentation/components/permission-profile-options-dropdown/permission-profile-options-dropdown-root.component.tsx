import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface PermissionProfileOptionsDropdownRootComponentProps
  extends DropdownMenuProps {
  children: ReactNode
}

export function PermissionProfileOptionsDropdownRootComponent({
  children,
  ...props
}: PermissionProfileOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
