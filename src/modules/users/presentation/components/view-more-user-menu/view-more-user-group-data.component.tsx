import type { ReactNode } from 'react'

interface ViewMoreUserGroupDataComponentProps {
  children: ReactNode
  cols?: number
}

export function ViewMoreUserGroupDataComponent({
  children,
  cols = 2
}: ViewMoreUserGroupDataComponentProps) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}
