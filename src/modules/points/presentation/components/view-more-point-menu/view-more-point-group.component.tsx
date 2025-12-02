import type { ReactNode } from 'react'

interface ViewMorePointGroupComponentProps {
  children: ReactNode
  cols?: number
}

export function ViewMorePointGroupComponent({
  children,
  cols = 2
}: ViewMorePointGroupComponentProps) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}
