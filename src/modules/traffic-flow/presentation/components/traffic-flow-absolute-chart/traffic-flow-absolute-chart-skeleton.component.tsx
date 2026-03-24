export function TrafficFlowAbsoluteChartSkeleton() {
  return (
    <div className="w-full h-full flex flex-col animate-pulse">
      <div className="space-y-1.5 p-6 flex flex-col gap-2 border-b">
        <div className="h-4 w-64 bg-muted rounded-md" />
        <div className="h-4 w-96 bg-muted rounded-md mt-1.5" />
      </div>

      <div className="w-full h-full flex flex-col animate-pulse p-6">
        <div className="p-6 h-full">
          <div className="relative h-full overflow-hidden rounded-md bg-muted/30">
            <div className="absolute inset-0 flex flex-col justify-between py-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-px bg-muted/50 w-full" />
              ))}
            </div>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
            >
              <path
                d="
              M0 260
              L120 260
              L120 210
              L260 210
              L260 280
              L420 280
              L420 180
              L580 180
              L580 240
              L740 240
              L740 150
              L880 150
              L880 220
              L1000 220
              L1000 400
              L0 400
              Z
            "
                fill="currentColor"
                className="text-muted/60"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
