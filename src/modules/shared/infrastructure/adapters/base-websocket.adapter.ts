import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'

export abstract class BaseWebSocketAdapter<TIncoming = unknown, TOutgoing = unknown> {
  constructor(protected readonly webSocketService: WebSocketGateway<TIncoming, TOutgoing>) {}

  async connect(url?: string): Promise<void> {
    await this.webSocketService.connect(url)
  }

  disconnect(): void {
    this.webSocketService.disconnect()
  }

  public onMessage(callback: (message: TIncoming) => void): () => void {
    return this.webSocketService.onMessage(callback)
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    return this.webSocketService.onConnectionChange(callback)
  }

  onConnectionError(callback: () => void): () => void {
    return this.webSocketService.onConnectionError(callback)
  }

  public onEvent<TEventName extends string = string>(
    event: TEventName
  ): {
    execute: <TPayload extends TIncoming = TIncoming>(
      callback: (message: TPayload) => void
    ) => () => void
  } {
    return this.webSocketService.onEvent<TEventName>(event)
  }

  public send(message: TOutgoing): void {
    this.webSocketService.send(message)
  }
}
