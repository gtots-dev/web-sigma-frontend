import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/configuration-processing-unit'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { ArrowUpDown, type LucideIcon } from 'lucide-react'

interface ConfigurationsPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    processingUnitId: string
  }>
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
    {
      operationId: rawOperationId,
      contractId: rawContractId,
      processingUnitId: rawProcessingUnitId
    }
  ] = await Promise.all([auth(), params])

  const getContractFactory = GetContractsFactory.create()
  const [{ userPermissions }, contracts] = await Promise.all([
    loadAuthContext(JWT, rawOperationId),
    getContractFactory.execute(JWT)
  ])

  const title = MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.1']
  const description = MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.2']
  const subDescription = MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.3']

  const operationOptions: ConfigurationCardOption[] = [
    {
      title: MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.4'],
      description: MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.5'],
      pathName: PATHNAMES.LANES(
        Number(rawOperationId),
        Number(rawContractId),
        Number(rawProcessingUnitId)
      ),
      icon: ArrowUpDown,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)
    }
  ]

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
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
            <HeaderOptions.SubDescription name={contractSelectedMoreInfo.name}>
              {subDescription}
            </HeaderOptions.SubDescription>
          </div>
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
            message={MESSAGES_CONFIGURATION_PROCESSING_UNIT['19.6']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
