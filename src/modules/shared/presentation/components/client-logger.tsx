'use client'

import { useEffect } from 'react'

export function ClientLogger() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Cache simples para remover logs idênticos enviados em um curto intervalo de tempo
    const recentLogs = new Map<string, number>()
    let isLogging = false

    const sendLog = async (level: 'error' | 'warn' | 'info', message: string, stack?: string) => {
      // Previne loop infinito de reentrância caso o envio do log gere um erro
      if (isLogging) return
      isLogging = true

      try {
        if (message.includes('/api/logs')) return

        const now = Date.now()
        const logKey = `${level}:${message}:${window.location.pathname}`
        const lastSent = recentLogs.get(logKey)

        // Ignora se o mesmo log foi enviado nos últimos 3 segundos
        if (lastSent && now - lastSent < 3000) return
        recentLogs.set(logKey, now)

        // Limpa o cache periodicamente se houver muitos registros
        if (recentLogs.size > 50) {
          for (const [key, timestamp] of recentLogs.entries()) {
            if (now - timestamp > 10000) recentLogs.delete(key)
          }
        }

        await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            level,
            message,
            stack,
            url: window.location.href,
            timestamp: new Date().toISOString()
          }),
          keepalive: true
        })
      } catch (err) {
        // Ignora falhas silenciosamente para evitar que falhas de log travem o cliente
      } finally {
        isLogging = false
      }
    }

    // 1. Capturar erros de tempo de execução não tratados
    const handleError = (event: ErrorEvent) => {
      const message = event.message || 'Erro de execução desconhecido'
      const stack = event.error?.stack || ''
      sendLog('error', message, stack)
    }

    // 2. Capturar rejeições de Promise não tratadas
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message = reason instanceof Error ? reason.message : String(reason)
      const stack = reason instanceof Error ? reason.stack : ''
      sendLog('error', `Rejeição de Promise não tratada: ${message}`, stack)
    }

    // 3. Sobrescrever console.error para capturar erros registrados manualmente (ex: Zustand ou Axios)
    const originalConsoleError = console.error
    console.error = (...args: any[]) => {
      originalConsoleError.apply(console, args)

      if (isLogging) return

      const message = args
        .map((arg) => {
          if (arg instanceof Error) return arg.message
          if (arg === null) return 'null'
          if (arg === undefined) return 'undefined'
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg)
            } catch {
              return '[Objeto Circular]'
            }
          }
          return String(arg)
        })
        .join(' ')

      const firstError = args.find((arg) => arg instanceof Error)
      const stack = firstError?.stack || new Error().stack || ''

      sendLog('error', `[console.error] ${message}`, stack)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
      console.error = originalConsoleError
    }
  }, [])

  return null
}
