'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/modules/shared/presentation/components/shadcn/collapsible'
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarSystemItemGrandchildComponent } from './sidebar-system-item-grandchild.component'
import { useSidebarSystemItem } from '../../hooks/use-sidebar-system-item.hook'
import type { SidebarSystemItemComponentProps } from '.'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function SidebarSystemItemChildComponent({
  item,
  activePath
}: SidebarSystemItemComponentProps) {
  const { handleClick, isActive } = useSidebarSystemItem(item)
  const [isOpen, setIsOpen] = useState(true)

  const buttonClassNames = clsx(
    'flex items-center h-9 w-full mb-2 min-w-0 gap-2 overflow-hidden rounded-md px-2 [&>span:last-child]:truncate [&>svg]:size-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    {
      'disabled:opacity-100 bg-primary-600 text-white [&>svg]:text-white hover:bg-primary-600 hover:text-white active:bg-primary-600 active:text-white':
        isActive,
      'hover:underline hover:underline-offset-2 cursor-pointer': !isActive
    }
  )

  const rotateArrowClassNames = clsx(
    'ml-auto transition-transform duration-200 h-5 w-5 hover:opacity-50',
    {
      'rotate-90': isOpen
    }
  )

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
      <SidebarMenuSubItem>
        <div className={buttonClassNames}>
          <Button
            className="justify-start px-0 w-full hover:bg-transparent disabled:opacity-100"
            variant="ghost"
            disabled={isActive}
            onClick={handleClick}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Button>
          <CollapsibleTrigger className="group aspect-square">
            {item.items && <ChevronRight className={rotateArrowClassNames} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {item.items && (
            <SidebarMenuSub className="!me-0 pe-0">
              {item.items.map((subItem) => (
                <SidebarSystemItemGrandchildComponent
                  key={subItem.title}
                  item={subItem}
                  activePath={activePath}
                />
              ))}
            </SidebarMenuSub>
          )}
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  )
}
