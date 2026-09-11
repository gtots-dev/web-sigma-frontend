import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { level = 'error', message, stack, url, timestamp } = body

    const formattedTime = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
    
    // Extract only the path/search from URL to keep it compact
    let compactUrl = url || 'N/A'
    try {
      const parsed = new URL(url)
      compactUrl = parsed.pathname + parsed.search
    } catch {}

    // Get the first 2 lines of the stack trace to avoid bloating the logs
    const compactStack = stack
      ? stack.split('\n').slice(0, 2).map(line => line.trim()).join(' | ')
      : 'N/A'

    // Output as a single, highly compact line
    const logLine = `[CLIENT-${level.toUpperCase()}] [${formattedTime}] [${compactUrl}] ${message} (Stack: ${compactStack})`

    if (level === 'error') {
      console.error(logLine)
    } else if (level === 'warn') {
      console.warn(logLine)
    } else {
      console.log(logLine)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    // Keep internal logging error as a single line too
    console.error(`[SERVER-ERROR] Failed logging client-side error: ${error instanceof Error ? error.message : String(error)}`)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
