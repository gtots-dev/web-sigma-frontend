import { useState, useEffect, useMemo, useCallback } from 'react'
import { useWebSocketConnection } from './use-websocket-connection.hook'
import { useWebSocketReconnect } from './use-websocket-reconnect.hook'

import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'

export function useWebSocketEngine<
  TIncoming = unknown,
  TOutgoing = unknown,
  TService extends WebSocketGateway<TIncoming, TOutgoing> = WebSocketGateway<
    TIncoming,
    TOutgoing
  >
>(factory: () => TService, options: { enabled?: boolean } = { enabled: true }) {
  const service = useMemo(factory, [])

  const [isConnected, setIsConnected] = useState(false)

  const reconnectStates = useWebSocketReconnect(service)

  useWebSocketConnection(service, setIsConnected)

  useEffect(() => {
    if (options.enabled) {
      service.connect()
      return () => service.disconnect()
    }
  }, [service, options.enabled])

  const send = useCallback(
    (message: TOutgoing) => {
      service.send(message)
    },
    [service]
  )

  return {
    service,
    isConnected,
    send,
    ...reconnectStates
  }
}
