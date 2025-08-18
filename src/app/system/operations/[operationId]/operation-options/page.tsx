import { auth } from '@/auth'
import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { OperationSelector } from '@/modules/operation-options/presentation/components/operation-selector'
import { getOperations } from '@/modules/operations/presentation/utils/get-operations.util'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { Settings, UserRoundSearch, type LucideIcon } from 'lucide-react'

interface OperationOptionsPageProps {
  params: Promise<{ operationId: string }>
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
  const {
    token: JWT,
    user: { isAdmin }
  } = await auth()
  const { operationId: rawOperationId } = await params
  const operations = await getOperations(JWT)
  const { operationId, userPermissions } = await loadAuthContext(
    JWT,
    rawOperationId
  )

  const title = MESSAGES_OPTIONS_OPERATION['11.1']
  const description = MESSAGES_OPTIONS_OPERATION['11.2']
  const subDescription = MESSAGES_OPTIONS_OPERATION['11.3']
  const operationSelectionMenuTitle = MESSAGES_OPTIONS_OPERATION['11.8']
  const operationSelectionMenuDescription = MESSAGES_OPTIONS_OPERATION['11.9']

  const operationOptions: OperationCardOption[] = [
    {
      title: MESSAGES_OPTIONS_OPERATION['11.4'],
      description: MESSAGES_OPTIONS_OPERATION['11.5'],
      pathName: PATHNAMES.OPERATION_CONFIGURATION_OPTIONS(operationId),
      icon: Settings,
      accessAllowed:
        isAdmin ||
        userPermissions.has(PermissionEnum.CONTRACTS_VIEW) ||
        userPermissions.has(PermissionEnum.USERS_VIEW) ||
        userPermissions.has(PermissionEnum.PERMISSIONS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.6'],
      description: MESSAGES_OPTIONS_OPERATION['11.7'],
      pathName: '',
      icon: UserRoundSearch,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.AUDIT_VIEW)
    }
  ]

  const accessibleOptions = operationOptions.filter(
    (option) => option.accessAllowed
  )

  return (
    <CardOperationOptions.Root>
      <CardOperationOptions.Header>
        <HeaderOptions.Root>
          <div className="flex flex-col gap-1">
            <HeaderOptions.Title>{title}</HeaderOptions.Title>
            <HeaderOptions.Description>{description}</HeaderOptions.Description>
            <HeaderOptions.SubDescription>
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
      </CardOperationOptions.Header>
      <CardOperationOptions.Content>
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
          <CardOperationOptions.NotFound
            message={MESSAGES_OPTIONS_OPERATION['11.10']}
          />
        )}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
