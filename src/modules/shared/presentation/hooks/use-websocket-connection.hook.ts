import { useEffect, useRef } from 'react'

export interface ConnectionListenable {
  onConnectionChange(callback: (connected: boolean) => void): () => void
}

export function useWebSocketConnection(
  service: ConnectionListenable,
  onConnectionChange: (connected: boolean) => void
) {
  const savedCallback = useRef(onConnectionChange)

  useEffect(() => {
    savedCallback.current = onConnectionChange
  }, [onConnectionChange])

  useEffect(() => {
    return service.onConnectionChange((connected) => savedCallback.current(connected))
  }, [service])
}
