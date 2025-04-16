import { cn } from '@/modules/shared/presentation/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-skeleton dark:bg-skeleton-foreground',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
