import type { ReactNode } from 'react'

interface CardOperationOptionsContentComponentProps {
  children: ReactNode
}

export function CardOperationOptionsContentComponent({
  children
}: CardOperationOptionsContentComponentProps) {
  return <div className="flex flex-wrap gap-7 sm:gap-14">{children}</div>
}
