export interface WebSocketGateway<TIncoming = unknown, TOutgoing = unknown> {
  connect(url?: string): Promise<void>
  disconnect(): void
  onMessage(callback: (message: TIncoming) => void): () => void
  onConnectionChange(callback: (connected: boolean) => void): () => void
  onConnectionError(callback: () => void): () => void
  onEvent<TEventName extends string = string>(
    event: TEventName
  ): {
    execute: <TPayload extends TIncoming = TIncoming>(
      callback: (message: TPayload) => void
    ) => () => void
  }
  send(message: TOutgoing): void
}
