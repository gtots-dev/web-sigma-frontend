'use client'

import { useState, useCallback } from 'react'
import type { Infraction } from '../../domain/interfaces/infraction.interface'
import { formatInfractionMediaAssets } from '../utils/format-infraction-media-assets.util'

export function useInfractionMedia(activeInfraction: Infraction | null) {
  const [assetState, setAssetState] = useState<{
    infractionId: string | number | undefined
    index: number
  }>({
    infractionId: activeInfraction?.id,
    index: 0
  })

  const activeAssetIndex =
    assetState.infractionId === activeInfraction?.id ? assetState.index : 0

  const setActiveAssetIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      setAssetState((prev) => {
        const currentIndex =
          prev.infractionId === activeInfraction?.id ? prev.index : 0
        const nextIndex =
          typeof index === 'function' ? index(currentIndex) : index
        return { infractionId: activeInfraction?.id, index: nextIndex }
      })
    },
    [activeInfraction?.id]
  )

  const activeMediaAssets = formatInfractionMediaAssets(activeInfraction)
  const activeAsset =
    activeMediaAssets[activeAssetIndex] ?? activeMediaAssets[0] ?? null

  return {
    activeAssetIndex,
    setActiveAssetIndex,
    activeMediaAssets,
    activeAsset
  }
}
