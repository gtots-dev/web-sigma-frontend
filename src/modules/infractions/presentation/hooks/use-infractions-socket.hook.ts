import { useMemo, useEffect, useCallback } from 'react'
import { useWebSocketEngine } from '@/modules/shared/presentation/hooks/use-websocket-engine.hook'
import { useWebSocketSubscription } from '@/modules/shared/presentation/hooks/use-websocket-subscription.hook'
import { InfractionsSocketFactory } from '../../infrastructure/factories/infractions-socket.factory'
import { useInfractionsWebsocketStore } from '../stores/infractions-websocket.store'
import type { LiveTrafficCaptureSocketEvent } from '../../domain/interfaces/infractions-websocket.interface'

export function useInfractionsSocket(
  contractId: string,
  enabled: boolean = true
) {
  const infractions = useInfractionsWebsocketStore((state) => state.infractions)
  const addCapture = useInfractionsWebsocketStore((state) => state.addCapture)
  const purgeExpired = useInfractionsWebsocketStore(
    (state) => state.purgeExpired
  )
  const clear = useInfractionsWebsocketStore((state) => state.clear)

  const validContractId = contractId ? String(contractId) : ''
  const isEnabled = enabled && !!validContractId

  useEffect(() => {
    if (isEnabled) {
      clear()
    }
  }, [validContractId, isEnabled, clear])

  useEffect(() => {
    if (!isEnabled) return
    const interval = setInterval(() => {
      purgeExpired()
    }, 5000)

    return () => clearInterval(interval)
  }, [isEnabled, purgeExpired])

  const factory = useCallback(() => {
    return InfractionsSocketFactory.create(validContractId)
  }, [validContractId])

  const { service, isConnected, hasFailed, isReconnecting, reconnect } =
    useWebSocketEngine(factory, {
      enabled: isEnabled
    })

  const subscribeCaptures = useMemo(
    () => service.onTrafficCaptureReceived.bind(service),
    [service]
  )

  useWebSocketSubscription(
    subscribeCaptures,
    (captureMessage: LiveTrafficCaptureSocketEvent) =>
      addCapture(captureMessage)
  )

  return {
    infractions,
    isConnected,
    hasFailed,
    isReconnecting,
    reconnect
  }
}
