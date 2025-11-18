import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface PointOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function PointOptionsDropdownRootComponent({
  children,
  ...props
}: PointOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
