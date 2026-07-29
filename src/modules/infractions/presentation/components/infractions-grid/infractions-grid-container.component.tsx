'use client'

import type { ReactNode } from 'react'

interface InfractionsGridContainerProps {
  children: ReactNode
  columns?: number
}

export function InfractionsGridContainerComponent({
  children,
  columns
}: InfractionsGridContainerProps) {
  const isManualOverride = typeof columns === 'number' && columns > 0

  return (
    <div className="relative flex-1 min-h-0 min-w-0 w-full overflow-y-auto pr-1">
      <section
        className={`grid gap-1 rounded-md justify-center content-start ${
          !isManualOverride
            ? 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
            : ''
        }`}
        style={
          isManualOverride
            ? {
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                width: '100%'
              }
            : { width: '100%' }
        }
      >
        {children}
      </section>
    </div>
  )
}
