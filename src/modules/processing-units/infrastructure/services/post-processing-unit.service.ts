import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import type { PostProcessingUnitGateway } from '../../domain/gateways/post-processing-unit.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostProcessingUnitService implements PostProcessingUnitGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private normalizeProcessingUnit(
    processingUnit: ProcessingUnitEntity
  ): ProcessingUnitEntity {
    const cfg =
      typeof processingUnit.cfg === 'string'
        ? processingUnit.cfg.trim() === ''
          ? {}
          : JSON.parse(processingUnit.cfg)
        : processingUnit.cfg

    return { ...processingUnit, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    processingUnit: ProcessingUnitEntity
  ): HttpRequestConfig<ProcessingUnitEntity> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/ups`,
      data: this.normalizeProcessingUnit(processingUnit),
      requiresAuth: true
    }
  }

  async execute(processingUnit: ProcessingUnitEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, processingUnit
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
