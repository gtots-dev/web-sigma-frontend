'use client'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { UserAccountInterface } from '.'
import {
  Avatar,
  AvatarFallback
} from '@/modules/shared/presentation/components/shadcn/avatar'
import { DeauthenticationButton } from '../deauthentication/deauthentication-button.component'
import { useInitialsFromText } from '../../hooks/use-initials-from-text.hook'
import { useSidebar } from '@/modules/shared/presentation/components/shadcn/sidebar'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

interface UserDropdownMenuComponentProps extends DropdownMenuContentProps {
  user: UserAccountInterface
}

export function UserDropdownMenuComponent({
  user: { name, email },
  ...props
}: UserDropdownMenuComponentProps) {
  const { getInitials } = useInitialsFromText()
  const { isMobile } = useSidebar()

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? 'bottom' : 'right'}
      align="end"
      sideOffset={4}
      {...props}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-9 w-9 rounded-lg">
            <AvatarFallback className="bg-primary-600 text-white text-[0.85rem] font-medium">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="p-0">
        <DeauthenticationButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
