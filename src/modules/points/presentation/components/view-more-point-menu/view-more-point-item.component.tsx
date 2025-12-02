import type { ReactNode } from 'react'

interface ViewMorePointItemComponentProps {
  children: ReactNode
  title: string
  notFoundData: string
}

export function ViewMorePointItemComponent({
  children,
  title,
  notFoundData
}: ViewMorePointItemComponentProps) {
  const hasContent =
    children !== undefined &&
    children !== null &&
    !(typeof children === 'string' && children.trim() === '')

  return (
    <div className="flex flex-col gap-y-1.5 min-h-12">
      <strong className="text-sm font-medium opacity-80">{title}:</strong>
      {hasContent ? (
        <div className="font-normal">{children}</div>
      ) : (
        <div className="font-normal opacity-70">{notFoundData}</div>
      )}
    </div>
  )
}
