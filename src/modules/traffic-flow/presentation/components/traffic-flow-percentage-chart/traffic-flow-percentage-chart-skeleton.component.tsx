export function TrafficFlowPercentageChartSkeleton() {
  return (
    <div className="w-full h-full flex flex-col animate-pulse">
      {/* Header */}
      <div className="space-y-1.5 p-6 flex flex-col gap-2 border-b">
        <div className="h-4 w-64 bg-muted rounded-md" />
        <div className="h-4 w-96 bg-muted rounded-md mt-1.5" />
      </div>

      {/* Chart area */}
      <div className="flex-1 p-6">
        <div className="relative h-full rounded-md bg-muted/30 overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between py-6 px-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-px bg-muted/50 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-6 pt-10 gap-4">
            {[
              60, 40, 75, 30, 85, 55, 70, 45
            ].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-muted/70 rounded-sm"
                style={{
                  height: `${height}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}