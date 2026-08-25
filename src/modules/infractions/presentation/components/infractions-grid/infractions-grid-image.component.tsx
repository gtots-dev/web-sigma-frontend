'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { useInfractionGrid } from './infractions-grid-provider.component'
import { useInfractionsStore } from '../../stores/infractions.store'

export function InfractionsGridImageComponent() {
  const infraction = useInfractionGrid()
  const params = useParams()
  const thumbnailFromStore = useInfractionsStore(
    (state) => state.thumbnailsMap[infraction.id]
  )
  const fetchCaptureThumbnail = useInfractionsStore(
    (state) => state.fetchCaptureThumbnail
  )
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const meta = infraction.response?.metadata?.[0]
  const imgSrc =
    thumbnailFromStore ||
    infraction.thumbnailUrl ||
    infraction.fileUrl ||
    (infraction.response?.file?.url !== '' ? infraction.response?.file?.url : undefined)

  useEffect(() => {
    if (imgSrc) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    const el = containerRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      if (el) observer.unobserve(el)
      observer.disconnect()
    }
  }, [imgSrc])

  useEffect(() => {
    if (!isVisible || imgSrc) return

    const file = infraction.files?.[0]
    if (!file || !file.id || !file.thumbnails || file.thumbnails.length === 0) {
      return
    }

    if (params?.operationId && params?.contractId) {
      const operationId = String(params.operationId)
      const contractId = String(params.contractId)
      const thumbIds = file.thumbnails.map((t) => t.id)

      setLoading(true)
      fetchCaptureThumbnail(
        { operationId, contractId },
        infraction.id,
        file.id,
        thumbIds
      ).finally(() => setLoading(false))
    }
  }, [isVisible, infraction.id, infraction.files, imgSrc, params, fetchCaptureThumbnail])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square bg-muted/30 flex items-center justify-center overflow-hidden rounded-lg"
    >
      {(loading || (!imgSrc && isVisible)) ? (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      ) : imgSrc ? (
        <img
          src={imgSrc}
          alt={infraction.response?.file?.name || meta?.type || 'Infração'}
          className="w-full h-full object-cover block transition-opacity duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground text-xs font-mono">
          Sem imagem
        </div>
      )}
    </div>
  )
}
