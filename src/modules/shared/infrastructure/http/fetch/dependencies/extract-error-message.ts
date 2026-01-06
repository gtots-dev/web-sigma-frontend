import type { ExtractErrorMessageGateway } from '@/modules/shared/domain/gateways/extract-error-message.gateway'
import type { ErrorWithDetailArrayInterface } from '@/modules/shared/domain/interfaces/error-with-detail-array.interface'
import type { ErrorWithDetailObjectInterface } from '@/modules/shared/domain/interfaces/error-with-detail-object.interface'
import type { ErrorWithMessageInterface } from '@/modules/shared/domain/interfaces/error-with-message.interface'

type UnknownObject = Record<string, unknown>

export class ExtractErrorMessage implements ExtractErrorMessageGateway {
  private readonly UNEXPECTED_ERROR = 'Erro inesperado'
  private readonly VALIDATION_ERROR = 'Erro de validação'

  private isObject(value: unknown): value is UnknownObject {
    return typeof value === 'object' && value !== null
  }

  private isDetailArray(
    value: unknown
  ): value is ErrorWithDetailArrayInterface {
    if (!this.isObject(value)) return false
    if (!('detail' in value)) return false

    return Array.isArray(value.detail)
  }

  private isDetailObject(
    value: unknown
  ): value is ErrorWithDetailObjectInterface {
    if (!this.isObject(value)) return false
    if (!('detail' in value)) return false

    return !Array.isArray(value.detail)
  }

  private hasMessage(value: unknown): value is ErrorWithMessageInterface {
    return (
      this.isObject(value) &&
      'message' in value &&
      typeof value.message === 'string'
    )
  }

  private extractMessageFromObject(value: UnknownObject): string | undefined {
    if ('message' in value && typeof value.message === 'string') {
      return value.message
    }

    if ('msg' in value && typeof value.msg === 'string') {
      return value.msg
    }

    return undefined
  }

  extract(data: unknown): string {
    if (typeof data === 'string') {
      return data
    }

    if (!this.isObject(data)) {
      return this.UNEXPECTED_ERROR
    }

    if (this.isDetailArray(data) && data.detail.length > 0) {
      const first = data.detail[0]

      if (this.isObject(first)) {
        return this.extractMessageFromObject(first) ?? this.VALIDATION_ERROR
      }

      return this.VALIDATION_ERROR
    }

    if (this.isDetailObject(data)) {
      const { detail } = data

      if (typeof detail === 'string') {
        return detail
      }

      if (this.isObject(detail)) {
        return this.extractMessageFromObject(detail) ?? this.UNEXPECTED_ERROR
      }
    }

    if (this.hasMessage(data)) {
      return data.message
    }

    return this.UNEXPECTED_ERROR
  }
}
