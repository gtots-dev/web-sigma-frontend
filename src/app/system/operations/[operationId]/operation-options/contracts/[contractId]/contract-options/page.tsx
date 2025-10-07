import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_CONTRACT } from '@/modules/shared/presentation/messages/options-contract'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { Settings, type LucideIcon } from 'lucide-react'

interface ContractOptionsPageProps {
  params: Promise<{ operationId: string; contractId: string }>
}

interface ContractCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ContractOptionsPage({
  params
}: ContractOptionsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])

  const getContractFactory = GetContractsFactory.create()
  const [{ userPermissions }, contracts] = await Promise.all([
    loadAuthContext(JWT, rawOperationId),
    getContractFactory.execute(JWT)
  ])

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

  const title = MESSAGES_OPTIONS_CONTRACT['16.1']
  const description = MESSAGES_OPTIONS_CONTRACT['16.2']
  const subDescription = MESSAGES_OPTIONS_CONTRACT['16.3']

  const operationOptions: ContractCardOption[] = [
    {
      title: MESSAGES_OPTIONS_CONTRACT['16.4'],
      description: MESSAGES_OPTIONS_CONTRACT['16.5'],
      pathName: PATHNAMES.CONTRACTS_CONFIGURATIONS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: Settings,
      accessAllowed:
        isAdmin ||
        userPermissions.has(PermissionEnum.POINTS_VIEW) ||
        userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)
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
            <HeaderOptions.SubDescription name={contractSelectedMoreInfo.name}>
              {subDescription}
            </HeaderOptions.SubDescription>
          </div>
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
            message={MESSAGES_OPTIONS_CONTRACT['11.10']}
          />
        )}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
