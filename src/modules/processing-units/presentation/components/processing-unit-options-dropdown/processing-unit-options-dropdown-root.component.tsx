import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ProcessingUnitsOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function ProcessingUnitsOptionsDropdownRootComponent({
  children,
  ...props
}: ProcessingUnitsOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
