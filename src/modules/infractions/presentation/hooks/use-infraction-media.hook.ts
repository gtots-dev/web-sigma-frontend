'use client'

import { useState, useEffect } from 'react'
import type { Infraction } from '../../domain/interfaces/infraction.interface'
import { formatInfractionMediaAssets } from '../utils/format-infraction-media-assets.util'

export function useInfractionMedia(activeInfraction: Infraction | null) {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0)

  useEffect(() => {
    setActiveAssetIndex(0)
  }, [activeInfraction?.id])

  const activeMediaAssets = formatInfractionMediaAssets(activeInfraction)
  const activeAsset = activeMediaAssets[activeAssetIndex] ?? activeMediaAssets[0] ?? null

  return {
    activeAssetIndex,
    setActiveAssetIndex,
    activeMediaAssets,
    activeAsset
  }
}
