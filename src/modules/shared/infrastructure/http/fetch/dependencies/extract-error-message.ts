import type { ExtractErrorMessageGateway } from '@/modules/shared/domain/gateways/extract-error-message.gateway'
import type { ErrorWithDetailArrayInterface } from '@/modules/shared/domain/interfaces/error-with-detail-array.interface'
import type { ErrorWithDetailObjectInterface } from '@/modules/shared/domain/interfaces/error-with-detail-object.interface'
import type { ErrorWithMessageInterface } from '@/modules/shared/domain/interfaces/error-with-message.interface'

export class ExtractErrorMessage implements ExtractErrorMessageGateway {
  private readonly UNEXPECTED_ERROR = 'Erro inesperado'
  private readonly VALIDATION_ERROR = 'Erro de validação'

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
  }

  private isDetailArray(
    value: unknown
  ): value is ErrorWithDetailArrayInterface {
    return this.isObject(value) && Array.isArray(value.detail)
  }

  private isDetailObject(
    value: unknown
  ): value is ErrorWithDetailObjectInterface {
    return (
      this.isObject(value) &&
      'detail' in value &&
      !Array.isArray((value as any).detail)
    )
  }

  private hasMessage(value: unknown): value is ErrorWithMessageInterface {
    return this.isObject(value) && typeof value.message === 'string'
  }

  extract(data: unknown): string {
    if (typeof data === 'string') return data
    if (!this.isObject(data)) return this.UNEXPECTED_ERROR

    if (this.isDetailArray(data) && data.detail.length > 0) {
      const first = data.detail[0]
      if (this.isObject(first)) {
        return (
          (first.msg as string) ??
          (first.message as string) ??
          this.VALIDATION_ERROR
        )
      }
      return this.VALIDATION_ERROR
    }

    if (this.isDetailObject(data)) {
      const detail = data.detail
      if (typeof detail === 'string') return detail
      if (this.isObject(detail)) {
        return (
          (detail.message as string) ??
          (detail.msg as string) ??
          this.UNEXPECTED_ERROR
        )
      }
    }

    if (this.hasMessage(data)) return data.message

    return this.UNEXPECTED_ERROR
  }
}
