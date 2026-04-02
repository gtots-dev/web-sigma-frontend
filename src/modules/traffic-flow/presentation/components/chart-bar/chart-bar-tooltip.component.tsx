import {
  ChartTooltip,
  ChartTooltipContent
} from '@/modules/shared/presentation/components/shadcn/chart'

export function ChartBarTooltip() {
  return (
    <ChartTooltip
      cursor={false}
      content={(props) => (
        <ChartTooltipContent {...props} indicator="dot" percentage />
      )}
    />
  )
}
