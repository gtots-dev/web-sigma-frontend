import type { ReactNode } from 'react'

interface CardOptionFooterComponentProps {
  children: ReactNode
}

export function CardOptionFooterComponent({
  children
}: CardOptionFooterComponentProps) {
  return <div className="flex flex-col gap-y-0.5 p-4 border-t">{children}</div>
}
