'use client'

import { useCallback } from 'react'
import { useInfractionsStore } from '../stores/infractions.store'
import { useBidirectionalScroll } from '@/modules/shared/presentation/hooks/use-bidirectional-scroll.hook'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useInfractionsPagination(params: UrlParams) {
  const {
    fetchOlder,
    fetchNewer,
    hasOlder,
    hasNewer,
    loadingOlder,
    loadingNewer
  } = useInfractionsStore()

  const handleNearBottom = useCallback(
    () => fetchOlder(params),
    [params, fetchOlder]
  )

  const handleNearTop = useCallback(
    () => fetchNewer(params),
    [params, fetchNewer]
  )

  useBidirectionalScroll({
    onNearBottom: handleNearBottom,
    onNearTop: handleNearTop,
    hasMore: { top: hasNewer, bottom: hasOlder },
    loading: { top: loadingNewer, bottom: loadingOlder },
    nudgeOnTop: true
  })
}
