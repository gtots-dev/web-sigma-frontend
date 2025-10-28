import { auth } from '@/auth'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { OperationSelector } from '@/modules/operation-options/presentation/components/operation-selector'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_OPERATION } from '@/modules/shared/presentation/messages/configuration-operation'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import {
  FileText,
  Settings,
  UserRoundSearch,
  type LucideIcon
} from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

interface OperationOptionsPageProps {
  params: Promise<UrlParams>
}

interface OperationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function OperationOptionsPage({
  params
}: OperationOptionsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId }
  ] = await Promise.all([auth(), params])

  const getOperationFactory = GetOperationsFactory.create()
  const [{ userPermissions }, operations] = await Promise.all([
    loadAuthContext(JWT, rawOperationId),
    getOperationFactory.execute(JWT)
  ])

  const title = MESSAGES_OPTIONS_OPERATION['11.1']
  const description = MESSAGES_OPTIONS_OPERATION['11.2']
  const subDescription = MESSAGES_OPTIONS_OPERATION['11.3']
  const operationSelectionMenuTitle = MESSAGES_OPTIONS_OPERATION['11.8']
  const operationSelectionMenuDescription = MESSAGES_OPTIONS_OPERATION['11.9']

  const operationOptions: OperationCardOption[] = [
    {
      title: MESSAGES_OPTIONS_OPERATION['11.4'],
      description: MESSAGES_OPTIONS_OPERATION['11.5'],
      pathName: PATHNAMES.OPERATION_CONFIGURATIONS(Number(rawOperationId)),
      icon: Settings,
      accessAllowed:
        isAdmin ||
        userPermissions.has(PermissionEnum.USERS_VIEW) ||
        userPermissions.has(PermissionEnum.PERMISSIONS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_OPERATION['14.4'],
      description: MESSAGES_CONFIGURATION_OPERATION['14.5'],
      pathName: PATHNAMES.CONTRACTS(Number(rawOperationId)),
      icon: FileText,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.6'],
      description: MESSAGES_OPTIONS_OPERATION['11.7'],
      pathName: PATHNAMES.ACTIVITY_REPORT(Number(rawOperationId)),
      icon: UserRoundSearch,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.ACTIVITY_REPORT_VIEW)
    }
  ]

  const operationSelectedMoreInfo = operations.find(
    (operation) => operation.id == rawOperationId
  )

  const accessibleOptions = operationOptions.filter(
    (option) => option.accessAllowed
  )

  return (
    <FrameOptions.Root>
      <FrameOptions.Header>
        <HeaderOptions.Root>
          <div className="flex flex-col gap-1">
            <HeaderOptions.Title>{title}</HeaderOptions.Title>
            <HeaderOptions.Description>{description}</HeaderOptions.Description>
            <HeaderOptions.SubDescription name={operationSelectedMoreInfo.name}>
              {subDescription}
            </HeaderOptions.SubDescription>
          </div>
          <OperationSelector.Root
            title={operationSelectionMenuTitle}
            description={operationSelectionMenuDescription}
            operationId={rawOperationId}
            operations={operations}
          />
        </HeaderOptions.Root>
      </FrameOptions.Header>
      <FrameOptions.Content>
        {accessibleOptions.length > 0 ? (
          accessibleOptions.map((option, index) => (
            <CardOption.Root key={index} pathName={option.pathName}>
              <CardOption.Header Icon={option.icon} />
              <CardOption.Footer>
                <CardOption.Title>{option.title}</CardOption.Title>
                <CardOption.Description>
                  {option.description}
                </CardOption.Description>
              </CardOption.Footer>
            </CardOption.Root>
          ))
        ) : (
          <FrameOptions.NotFound
            message={MESSAGES_OPTIONS_OPERATION['11.10']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
