import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface HeaderSectionRootComponentProps extends ComponentProps<'header'> {}

export function HeaderSectionRootComponent({
  className,
  children,
  ...props
}: HeaderSectionRootComponentProps) {
  return (
    <header
      className={cn(
        'flex flex-col lg:flex-row lg:items-center p-5 lg:gap-5 min-w-0 w-full gap-2.5 sm:gap-3 px-3.5 py-3 sm:px-5 sm:py-3.5 bg-card/70 backdrop-blur-md border border-border/60 shadow-xs rounded-xl overflow-hidden transition-all duration-300 group',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
