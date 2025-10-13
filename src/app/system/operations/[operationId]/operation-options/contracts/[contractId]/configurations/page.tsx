import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { ContractSelector } from '@/modules/contracts/presentation/components/contract-selector'
import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_CONTRACT } from '@/modules/shared/presentation/messages/configuration-contract'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { HardDrive, MapPin, type LucideIcon } from 'lucide-react'

interface ConfigurationsPageProps {
  params: Promise<{ operationId: string; contractId: string }>
}

interface ConfigurationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ConfigurationsPage({
  params
}: ConfigurationsPageProps) {
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

  const title = MESSAGES_CONFIGURATION_CONTRACT['17.1']
  const description = MESSAGES_CONFIGURATION_CONTRACT['17.2']
  const subDescription = MESSAGES_CONFIGURATION_CONTRACT['17.3']
  const contractSelectionMenuTitle = MESSAGES_CONFIGURATION_CONTRACT['17.8']
  const contractSelectionMenuDescription =
    MESSAGES_CONFIGURATION_CONTRACT['17.9']

  const operationOptions: ConfigurationCardOption[] = [
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.6'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.7'],
      pathName: PATHNAMES.PROCESSING_UNITS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: HardDrive,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.4'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.5'],
      pathName: PATHNAMES.PERMISSIONS(Number(rawOperationId)),
      icon: MapPin,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.POINTS_VIEW)
    }
  ]

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

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
          <ContractSelector.Root
            title={contractSelectionMenuTitle}
            description={contractSelectionMenuDescription}
            contractId={Number(rawContractId)}
            contracts={contracts}
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
            message={MESSAGES_CONFIGURATION_CONTRACT['17.10']}
          />
        )}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
