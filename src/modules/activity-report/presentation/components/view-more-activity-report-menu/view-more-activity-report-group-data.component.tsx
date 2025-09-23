import type { ReactNode } from 'react'

interface ViewMoreActivityReportGroupDataComponentProps {
  children: ReactNode
  cols?: number
}

export function ViewMoreActivityReportGroupDataComponent({
  children,
  cols = 2
}: ViewMoreActivityReportGroupDataComponentProps) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}
