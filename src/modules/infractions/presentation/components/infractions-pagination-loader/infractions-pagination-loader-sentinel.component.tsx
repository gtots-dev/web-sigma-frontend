'use client'

interface InfractionsPaginationLoaderSentinelProps {
  position: 'top' | 'bottom'
}

export function InfractionsPaginationLoaderSentinelComponent({
  position
}: InfractionsPaginationLoaderSentinelProps) {
  const sentinelId = position === 'top' ? 'sentinel-top' : 'sentinel-bottom'
  return (
    <div
      id={sentinelId}
      className="col-span-full h-1 w-full pointer-events-none"
      style={{ overflowAnchor: 'none' }}
    />
  )
}
