import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusProcessingUnitIgnoreGateway } from '../../domain/gateways/delete-status-processing-unit-ignore.gateway'

export class DeleteStatusProcessingUnitIgnoreService implements DeleteStatusProcessingUnitIgnoreGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'DELETE',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/status-list-ignore/${this.params.ignoreId}`,
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
