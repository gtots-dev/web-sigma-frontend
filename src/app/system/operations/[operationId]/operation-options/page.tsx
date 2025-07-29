import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { OperationSelector } from '@/modules/operation-options/presentation/components/operation-selector/'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { FileKey2, FileText, UsersRound, type LucideIcon } from 'lucide-react'

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
  const { operationId: rawOperationId } = await params
  const { operationId, userPermissions, operations } =
    await loadAuthContext(rawOperationId)

  const title = MESSAGES_OPTIONS_OPERATION['11.1']
  const description = MESSAGES_OPTIONS_OPERATION['11.2']
  const subDescription = MESSAGES_OPTIONS_OPERATION['11.3']
  const operationSelectionMenuTitle = MESSAGES_OPTIONS_OPERATION['11.10']
  const operationSelectionMenuDescription = MESSAGES_OPTIONS_OPERATION['11.11']

  const operationOptions: OperationCardOption[] = [
    {
      title: MESSAGES_OPTIONS_OPERATION['11.4'],
      description: MESSAGES_OPTIONS_OPERATION['11.5'],
      pathName: PATHNAMES.CONTRACTS(operationId),
      icon: FileText,
      accessAllowed: userPermissions.has(PermissionEnum.CONTRACTS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.6'],
      description: MESSAGES_OPTIONS_OPERATION['11.7'],
      pathName: PATHNAMES.USERS(operationId),
      icon: UsersRound,
      accessAllowed: userPermissions.has(PermissionEnum.USERS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.8'],
      description: MESSAGES_OPTIONS_OPERATION['11.9'],
      pathName: PATHNAMES.PERMISSIONS(operationId),
      icon: FileKey2,
      accessAllowed: userPermissions.has(PermissionEnum.PERMISSIONS_VIEW)
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
          <CardOperationOptions.NotFound message="Nenhuma opção disponível para essa operação." />
        )}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
