'use client'

export function MonitoringViewBackgroundPattern({ offset }: { offset: { x: number; y: number } }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.25]"
      style={{
        backgroundImage: 'radial-gradient(currentColor 1.0px, transparent 0)',
        backgroundSize: '32px 32px',
        backgroundPosition: `${offset.x}px ${offset.y}px`
      }}
    />
  )
}
