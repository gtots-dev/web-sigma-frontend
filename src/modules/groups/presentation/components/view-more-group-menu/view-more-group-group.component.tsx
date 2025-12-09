import type { ReactNode } from 'react'

interface ViewMoreGroupGroupComponentProps {
  children: ReactNode
  cols?: number
}

export function ViewMoreGroupGroupComponent({
  children,
  cols = 2
}: ViewMoreGroupGroupComponentProps) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}
