import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'

export type WebSocketInterceptor = (url: string) => Promise<string>

export class NativeWebSocketService<
  TIncoming = unknown,
  TOutgoing = unknown
> implements WebSocketGateway<TIncoming, TOutgoing> {
  private socket: WebSocket | null = null
  private connectionListeners: Set<(connected: boolean) => void> = new Set()
  private errorListeners: Set<() => void> = new Set()
  private messageListeners: Set<(message: TIncoming) => void> = new Set()
  private reconnectTimeout: NodeJS.Timeout | null = null
  private retryCount = 0
  private readonly MAX_RETRIES = 5
  private readonly RETRY_DELAY = 3000
  private url: string | null = null
  private readonly baseURL: string

  constructor(
    private readonly interceptors: WebSocketInterceptor[] = [],
    baseURL: string
  ) {
    this.baseURL = (baseURL ?? '').replace(/^http/, 'ws')
  }

  async connect(url?: string): Promise<void> {
    let finalUrl = url
      ? url.startsWith('ws')
        ? url
        : `${this.baseURL}${url}`
      : this.baseURL

    if (!finalUrl) {
      console.error(
        '[ERROR] Tentativa de conectar ao WebSocket sem URL definida.'
      )
      return
    }

    for (const interceptor of this.interceptors) {
      try {
        finalUrl = await interceptor(finalUrl)
      } catch (error) {
        console.error('[ERROR] Erro no interceptor de WebSocket', error)
      }
    }

    if (this.socket?.readyState === WebSocket.OPEN) return

    this.url = finalUrl
    console.info(`[INFO] Conectando ao WebSocket (interceptado): ${finalUrl}`)

    try {
      this.socket = new WebSocket(finalUrl)

      this.socket.onopen = () => {
        console.info('[INFO] Conexão WebSocket estabelecida')
        this.retryCount = 0
        this.notifyConnectionChange(true)
      }

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as TIncoming
          this.messageListeners.forEach((callback) => callback(data))
        } catch (error) {
          console.error(
            '[ERROR] Erro ao processar mensagem do WebSocket',
            error
          )
        }
      }

      this.socket.onclose = () => {
        console.warn('[WARN] Conexão WebSocket fechada')
        this.notifyConnectionChange(false)
        this.handleReconnect()
      }
    } catch (error) {
      console.error('[ERROR] Falha ao criar instância do WebSocket', error)
      this.handleReconnect()
    }
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.socket) {
      this.socket.onclose = null
      this.socket.onerror = null
      this.socket.close()
      this.socket = null
    }

    this.retryCount = 0
    this.notifyConnectionChange(false)
    console.info('[INFO] WebSocket desconectado manualmente')
  }

  onMessage(callback: (message: TIncoming) => void): () => void {
    this.messageListeners.add(callback)
    return () => this.messageListeners.delete(callback)
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionListeners.add(callback)
    return () => this.connectionListeners.delete(callback)
  }

  onConnectionError(callback: () => void): () => void {
    this.errorListeners.add(callback)
    return () => this.errorListeners.delete(callback)
  }

  onEvent<TEventName extends string = string>(
    event: TEventName
  ): {
    execute: <TPayload extends TIncoming = TIncoming>(
      callback: (message: TPayload) => void
    ) => () => void
  } {
    return {
      execute: <TPayload extends TIncoming = TIncoming>(
        callback: (message: TPayload) => void
      ) => {
        return this.onMessage((message: TIncoming) => {
          const rawMessage = message as
            | { event?: string; type?: string }
            | null
            | undefined
          const eventName = rawMessage?.event || rawMessage?.type

          if (message && eventName === event) {
            callback(message as TPayload)
          }
        })
      }
    }
  }

  send(message: TOutgoing): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message))
    } else {
      console.error(
        '[ERROR] Não é possível enviar mensagem: WebSocket não está aberto'
      )
    }
  }

  private notifyConnectionChange(connected: boolean): void {
    this.connectionListeners.forEach((callback) => callback(connected))
  }

  private handleReconnect(): void {
    if (this.retryCount < this.MAX_RETRIES && this.url) {
      this.retryCount++
      console.info(
        `[INFO] Tentando reconectar (${this.retryCount}/${this.MAX_RETRIES}) em ${this.RETRY_DELAY}ms...`
      )
      this.reconnectTimeout = setTimeout(() => {
        if (this.url) this.connect(this.url)
      }, this.RETRY_DELAY)
    } else if (this.retryCount >= this.MAX_RETRIES) {
      console.warn('[WARN] Máximo de tentativas de reconexão atingido')
      this.errorListeners.forEach((callback) => callback())
    }
  }
}
