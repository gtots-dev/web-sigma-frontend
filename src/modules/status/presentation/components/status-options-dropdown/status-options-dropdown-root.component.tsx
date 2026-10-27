import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface StatusOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function StatusOptionsDropdownRootComponent({
  children,
  ...props
}: StatusOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
