import { useState, useCallback } from 'react'
import { useWebSocketConnection } from './use-websocket-connection.hook'
import { useWebSocketError } from './use-websocket-error.hook'

export interface Reconnectable {
  connect(): void
  disconnect(): void
  onConnectionChange(callback: (connected: boolean) => void): () => void
  onConnectionError(callback: () => void): () => void
}

export function useWebSocketReconnect(service: Reconnectable) {
  const [hasFailed, setHasFailed] = useState(false)
  const [isReconnecting, setIsReconnecting] = useState(false)

  useWebSocketConnection(service, (connected) => {
    if (connected) {
      setHasFailed(false)
      setIsReconnecting(false)
    }
  })

  useWebSocketError(service, () => {
    setHasFailed(true)
    setIsReconnecting(false)
  })

  const reconnect = useCallback(() => {
    setHasFailed(false)
    setIsReconnecting(true)
    service.disconnect()
    service.connect()
  }, [service])

  return {
    hasFailed,
    isReconnecting,
    reconnect
  }
}
