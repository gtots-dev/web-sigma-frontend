import type { ReactNode } from 'react'

interface ViewMoreUserItemDataComponentProps {
  children: ReactNode
  title: string
  notFoundData: string
}

export function ViewMoreUserItemDataComponent({
  children,
  title,
  notFoundData
}: ViewMoreUserItemDataComponentProps) {
  const hasContent = Boolean(children)
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
