'use client'

import type { ReactNode } from 'react'
import { InfractionsPaginationLoaderSentinelComponent } from './infractions-pagination-loader-sentinel.component'
import { InfractionsPaginationLoaderSpinnerComponent } from './infractions-pagination-loader-spinner.component'
import { InfractionsPaginationLoaderHintComponent } from './infractions-pagination-loader-hint.component'

interface InfractionsPaginationLoaderRootProps {
  position: 'top' | 'bottom'
  loading?: boolean
  hasMore?: boolean
  children?: ReactNode
}

export function InfractionsPaginationLoaderRootComponent({
  position,
  loading = false,
  hasMore = false,
  children
}: InfractionsPaginationLoaderRootProps) {
  if (children) {
    return <>{children}</>
  }

  return (
    <>
      <InfractionsPaginationLoaderSentinelComponent position={position} />
      {loading ? (
        <InfractionsPaginationLoaderSpinnerComponent
          loading={loading}
          position={position}
        />
      ) : (
        <InfractionsPaginationLoaderHintComponent
          hasMore={hasMore}
          position={position}
        />
      )}
    </>
  )
}
