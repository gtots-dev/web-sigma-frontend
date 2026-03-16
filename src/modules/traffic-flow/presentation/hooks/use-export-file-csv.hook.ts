import { useCallback } from 'react'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import { TOTAL_CHART_SERIES } from '@/modules/system/infrastructure/configs/total-chart-series.config'

type DatasetItem = {
  data: string
  value: number
}

type DatasetRow = Record<string, DatasetItem[]>
type Dataset = DatasetRow[]
type CsvRow = Record<string, string | number>

function formatDate(
  date: string,
  granularity: TrafficFlowGranularityInterface
) {
  const d = new Date(date)
  const pad = (n: number) => String(n).padStart(2, '0')

  const day = pad(d.getDate())
  const month = pad(d.getMonth() + 1)
  const year = d.getFullYear()

  const hour = pad(d.getHours())
  const minute = pad(d.getMinutes())
  const second = pad(d.getSeconds())

  return {
    hour: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
    day: `${day}/${month}/${year}`,
    month: `${month}/${year}`,
    year: `${year}`
  }[granularity]
}

export function mapVehicleNames(
  dataset: DatasetRow,
  vehiclesTypes: { id: string | number; name: string }[]
): DatasetRow {
  const vehiclesMap = new Map(vehiclesTypes.map((v) => [String(v.id), v.name]))

  return Object.fromEntries(
    Object.entries(dataset).map(([key, value]) => {
      if (key === TOTAL_CHART_SERIES.key)
        return [TOTAL_CHART_SERIES.label, value]
      const vehicleName = vehiclesMap.get(key) ?? key
      return [vehicleName, value]
    })
  )
}

function normalizeDataset(
  dataset: Dataset,
  granularity: TrafficFlowGranularityInterface
): CsvRow[] {
  const rowsMap: Record<string, CsvRow> = {}

  dataset.forEach((row) => {
    Object.entries(row).forEach(([seriesKey, items]) => {
      items.forEach((item) => {
        const date = formatDate(item.data, granularity)

        if (!rowsMap[date]) rowsMap[date] = { data: date }
        rowsMap[date][seriesKey] = item.value
      })
    })
  })

  return Object.values(rowsMap)
}

function jsonToCsv(rows: CsvRow[]) {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const csvRows = rows.map((row) =>
    headers
      .map((header) => `"${String(row[header] ?? '').replace(/"/g, '""')}"`)
      .join(',')
  )
  return '\uFEFF' + [headers.join(','), ...csvRows].join('\n')
}

export function useExportCsv() {
  const exportCsv = useCallback(
    (
      granularity: TrafficFlowGranularityInterface,
      dataset: Dataset,
      filename = 'export.csv'
    ) => {
      const normalized = normalizeDataset(dataset, granularity)
      const csv = jsonToCsv(normalized)

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()

      URL.revokeObjectURL(url)
    },
    []
  )

  return { exportCsv }
}
