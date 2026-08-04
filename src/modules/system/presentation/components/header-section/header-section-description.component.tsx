import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'

export interface HeaderSectionDescriptionComponentProps
  extends ComponentProps<'div'> {}

export function HeaderSectionDescriptionComponent({
  className,
  children,
  ...props
}: HeaderSectionDescriptionComponentProps) {
  return (
    <div
      className={cn(
        'text-xs leading-[1.3rem] text-muted-foreground flex items-center gap-1.5 truncate',
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 hidden lg:inline-block" />
      <Separator orientation="vertical" />
      <span className="truncate">{children}</span>
    </div>
  )
}
