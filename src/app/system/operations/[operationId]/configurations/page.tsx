import { auth } from '@/auth'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { OperationSelector } from '@/modules/operations/presentation/components/operation-selector'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_OPERATION } from '@/modules/shared/presentation/messages/configuration-operation'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { FileKey2, UsersRound, type LucideIcon } from 'lucide-react'

interface ConfigurationOptionsPageProps {
  params: Promise<{ operationId: string }>
}

interface ConfigurationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ConfigurationOptionsPage({
  params
}: ConfigurationOptionsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId }
  ] = await Promise.all([auth(), params])

  const getOperationsFactory = GetOperationsFactory.create()
  const [{ operationId, userPermissions }, operations] = await Promise.all([
    loadAuthContext(JWT, rawOperationId),
    getOperationsFactory.execute(JWT)
  ])

  const title = MESSAGES_CONFIGURATION_OPERATION['14.1']
  const description = MESSAGES_CONFIGURATION_OPERATION['14.2']
  const subDescription = MESSAGES_CONFIGURATION_OPERATION['14.3']
  const operationSelectionMenuTitle = MESSAGES_CONFIGURATION_OPERATION['14.10']
  const operationSelectionMenuDescription =
    MESSAGES_CONFIGURATION_OPERATION['14.11']

  const operationOptions: ConfigurationCardOption[] = [
    {
      title: MESSAGES_CONFIGURATION_OPERATION['14.6'],
      description: MESSAGES_CONFIGURATION_OPERATION['14.7'],
      pathName: PATHNAMES.USERS(operationId),
      icon: UsersRound,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.USERS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_OPERATION['14.8'],
      description: MESSAGES_CONFIGURATION_OPERATION['14.9'],
      pathName: PATHNAMES.PERMISSIONS(operationId),
      icon: FileKey2,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.PERMISSIONS_VIEW)
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
            message={MESSAGES_CONFIGURATION_OPERATION['14.12']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
