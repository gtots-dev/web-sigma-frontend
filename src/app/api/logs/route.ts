import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { level = 'error', message, stack, url, timestamp } = body

    const formattedTime = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
    
    // Extrai apenas o caminho e a busca da URL para mantê-la compacta
    let compactUrl = url || 'N/A'
    try {
      const parsed = new URL(url)
      compactUrl = parsed.pathname + parsed.search
    } catch {}

    // Obtém as duas primeiras linhas do rastreamento de pilha (stack trace) para evitar inchar os logs
    const compactStack = stack
      ? stack.split('\n').slice(0, 2).map(line => line.trim()).join(' | ')
      : 'N/A'

    // Exibe como uma única linha altamente compacta
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
    // Mantém erro interno de log em uma única linha também
    console.error(`[SERVER-ERROR] Falha ao registrar log de erro do cliente: ${error instanceof Error ? error.message : String(error)}`)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
