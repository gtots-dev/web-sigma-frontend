import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ContractOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function ContractOptionsDropdownRootComponent({
  children,
  ...props
}: ContractOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
