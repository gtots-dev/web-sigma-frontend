'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, CircleAlert } from 'lucide-react'
import clsx from 'clsx'
import {
  Collapsible,
  CollapsibleTrigger
} from '@/modules/shared/presentation/components/shadcn/collapsible'
import {
  SidebarMenuSub,
  SidebarMenuSubItem
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useSidebarSystemItem } from '../../hooks/use-sidebar-system-item.hook'
import { useIsOperationDisabled } from '../../hooks/use-is-operation-disabled.hook'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import type { SidebarSystemItemComponentProps } from '.'
import type { Item } from '.'
import type { ReactNode } from 'react'

const variants = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } }
}

interface SidebarSystemItemChildComponentProps
  extends SidebarSystemItemComponentProps {
  children?: (item: Item) => ReactNode
}

export function SidebarSystemItemChildComponent({
  item,
  children
}: SidebarSystemItemChildComponentProps) {
  const isCurrentPathOperation = useIsOperationDisabled()
  const { handleClick, isActive } = useSidebarSystemItem(item)
  const [isOpen, setIsOpen] = useState(true)

  const buttonClassNames = clsx(
    'flex items-center h-9 w-full mb-1.5 min-w-0 gap-2 overflow-hidden rounded-md px-2 [&>span:last-child]:truncate [&>svg]:size-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    {
      'disabled:opacity-100 bg-primary-600 text-white [&>svg]:text-white hover:!bg-primary-600 hover:!text-white dark:!hover:bg-primary-600 dark:!hover:text-white active:bg-primary-600 active:text-white':
        isActive,
      'hover:underline hover:underline-offset-2 cursor-pointer': !isActive
    }
  )

  const rotateArrowClassNames = clsx(
    'ml-auto transition-transform duration-200 h-4 w-4 hover:opacity-50',
    {
      'rotate-90': isOpen
    }
  )

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
      {item.permissions && (
        <SidebarMenuSubItem>
          <div className={buttonClassNames}>
            {item.items && !isCurrentPathOperation && item.isToExpand && (
              <CollapsibleTrigger
                className="group aspect-square"
                disabled={isCurrentPathOperation}
              >
                <ChevronRight className={rotateArrowClassNames} />
              </CollapsibleTrigger>
            )}
            <Button
              className="overflow-hidden justify-start px-0 w-full hover:bg-transparent disabled:opacity-100"
              variant="ghost"
              disabled={isActive}
              onClick={handleClick}
            >
              {item.icon && <item.icon className="!w-3.5 !h-3.5" />}
              <span className="truncate" title={item.title}>
                {item.title}
              </span>
            </Button>
          </div>

          {item.items && (
            <motion.div
              initial="closed"
              animate={!isCurrentPathOperation && isOpen ? 'open' : 'closed'}
              variants={variants}
              className="overflow-hidden"
            >
              <SidebarMenuSub className="!me-0 pe-0">
                {item.items.map((subItem) =>
                  subItem.permissions && children ? children(subItem) : null
                )}
              </SidebarMenuSub>
            </motion.div>
          )}

          {isCurrentPathOperation && (
            <motion.div
              initial="closed"
              animate="open"
              variants={variants}
              className="overflow-hidden"
            >
              <Separator className="my-4" />
              <div className="flex flex-col gap-1.5 p-4 rounded-lg border text-muted-foreground bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-x-1.5">
                  <CircleAlert className="h-4 w-4" />
                  <span className="text-xs font-bold">Aviso:</span>
                </div>
                <span className="text-xs">
                  Selecione uma operação ao lado para visualizar as seções e
                  opções correspondentes.
                </span>
              </div>
            </motion.div>
          )}
        </SidebarMenuSubItem>
      )}
    </Collapsible>
  )
}
