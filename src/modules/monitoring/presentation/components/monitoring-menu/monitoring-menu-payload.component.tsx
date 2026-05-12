import React from 'react'

interface MonitoringMenuPayloadProps {
  json?: string
}

export function MonitoringMenuPayload({ json }: MonitoringMenuPayloadProps) {
  if (!json) return null

  return (
    <div className="p-3">
      <div className="rounded-lg border bg-background">
        <div className="flex items-center gap-1.5 border-b px-2 py-1">
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            json
          </span>
        </div>

        <pre className="overflow-auto p-2 w-full">
          <code className="font-mono text-[11px] leading-4 whitespace-pre-wrap break-all text-foreground">
            {json}
          </code>
        </pre>
      </div>
    </div>
  )
}
