import * as React from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

type BaseSeries<TKey extends string = string> = {
  key: TKey
  label: string
  color: string
}

type Props<TSeries extends BaseSeries> = {
  series: TSeries[]
  value: TSeries['key'][]
  onChange: (value: TSeries['key'][]) => void
  verticalAlign?: 'top' | 'bottom' | 'center'
  className?: string
}

export function SeriesMultiSelectInline<TSeries extends BaseSeries>({
  series,
  value,
  onChange,
  verticalAlign = 'bottom',
  className
}: Props<TSeries>) {
  function toggle(key: TSeries['key']) {
    if (value.includes(key)) {
      onChange(value.filter((v) => v !== key))
    } else {
      onChange([...value, key])
    }
  }

  const verticalSpacing = {
    top: 'pb-3',
    center: 'py-0',
    bottom: 'pt-3'
  }[verticalAlign]

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalSpacing,
        className
      )}
    >
      {series.map((serie) => {
        const isActive = value.includes(serie.key)

        return (
          <button
            key={serie.key}
            type="button"
            disabled={value.length === 1 && value.includes(serie.key)}
            onClick={() => toggle(serie.key)}
            className={cn(
              'flex items-center gap-1.5 transition-opacity duration-200',
              'hover:opacity-80',
              isActive ? 'opacity-100' : 'opacity-20'
            )}
          >
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: serie.color }}
            />

            <span className="text-sm">{serie.label}</span>
          </button>
        )
      })}
    </div>
  )
}
