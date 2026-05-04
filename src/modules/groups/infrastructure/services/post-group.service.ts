import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupEntity } from '../../domain/entities/group.entity'
import type { PostGroupGateway } from '../../domain/gateways/post-group.gateway'

export class PostGroupService implements PostGroupGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private normalizeGroup(group: GroupEntity): GroupEntity {
    const cfg =
      typeof group.cfg === 'string'
        ? group.cfg.trim() === ''
          ? {}
          : JSON.parse(group.cfg)
        : group.cfg

    return { ...group, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ): HttpRequestConfig<GroupEntity> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/groups`,
      data: this.normalizeGroup(group),
      requiresAuth: true
    }
  }

  async execute(group: GroupEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, group
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
