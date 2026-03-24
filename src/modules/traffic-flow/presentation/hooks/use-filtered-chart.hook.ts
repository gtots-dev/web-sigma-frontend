'use client'

import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import {
  type SeriesConfig,
  type SeriesKey
} from '../components/traffic-flow-absolute-chart'
import type { ChartDatum } from './use-traffic-chart-adapter'

function addTime(
  date: Date,
  granularity: TrafficFlowGranularityInterface
): Date {
  const next = new Date(date)

  switch (granularity) {
    case 'hour':
      next.setHours(next.getHours() + 1)
      break
    case 'day':
      next.setDate(next.getDate() + 1)
      break
    case 'month':
      next.setMonth(next.getMonth() + 1)
      break
    case 'year':
      next.setFullYear(next.getFullYear() + 1)
      break
  }

  return next
}

export function generateRandomChartData<TKey extends SeriesKey>(params: {
  startDate: string
  points: number
  granularity: TrafficFlowGranularityInterface
  series: SeriesConfig<TKey>[]
  min?: number
  max?: number
}): ChartDatum[] {
  const { startDate, points, granularity, series, min = 50, max = 500 } = params

  const data: ChartDatum[] = []
  let currentDate = new Date(startDate)

  for (let i = 0; i < points; i++) {
    const row: ChartDatum = {
      date: String(currentDate.getTime())
    }

    for (const item of series) {
      row[item.key] = randomBetween(min, max)
    }

    data.push(row)
    currentDate = addTime(currentDate, granularity)
  }

  return data
}

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function normalizeDateByGranularity(
  date: Date,
  granularity: TrafficFlowGranularityInterface
): number {
  const d = new Date(date)

  switch (granularity) {
    case 'year':
      d.setMonth(0, 1)
      d.setHours(0, 0, 0, 0)
      break

    case 'month':
      d.setDate(1)
      d.setHours(0, 0, 0, 0)
      break

    case 'day':
      d.setHours(0, 0, 0, 0)
      break

    case 'hour':
      d.setMinutes(0, 0, 0)
      break
  }

  return d.getTime()
}

export function formatDateByGranularity(
  value: number,
  granularity: TrafficFlowGranularityInterface
): string {
  const date = new Date(value)
  switch (granularity) {
    case 'hour':
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)

    case 'day':
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)

    case 'month':
      return new Intl.DateTimeFormat('pt-BR', {
        month: '2-digit',
        year: 'numeric'
      }).format(date)

    case 'year':
      return date.getFullYear().toString()
  }
}
