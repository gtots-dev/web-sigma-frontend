import { useEffect, useRef } from 'react'

export interface ErrorListenable {
  onConnectionError(callback: () => void): () => void
}

export function useWebSocketError(
  service: ErrorListenable,
  onConnectionError: () => void
) {
  const savedCallback = useRef(onConnectionError)

  useEffect(() => {
    savedCallback.current = onConnectionError
  }, [onConnectionError])

  useEffect(() => {
    return service.onConnectionError(() => savedCallback.current())
  }, [service])
}
