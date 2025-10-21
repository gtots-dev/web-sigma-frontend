import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_PROCESSING_UNIT_OPTIONS } from '@/modules/shared/presentation/messages/processing-unit-options'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { Settings, type LucideIcon } from 'lucide-react'

interface ProcessingUnitPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    processingUnitId: string
  }>
}

interface ProcessingUnitOptionCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ProcessingUnitOptionPage({
  params
}: ProcessingUnitPageProps) {
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

  const title = MESSAGES_PROCESSING_UNIT_OPTIONS['18.1']
  const description = MESSAGES_PROCESSING_UNIT_OPTIONS['18.2']
  const subDescription = MESSAGES_PROCESSING_UNIT_OPTIONS['18.3']

  const operationOptions: ProcessingUnitOptionCardOption[] = [
    {
      title: MESSAGES_PROCESSING_UNIT_OPTIONS['18.4'],
      description: MESSAGES_PROCESSING_UNIT_OPTIONS['18.5'],
      pathName: PATHNAMES.PROCESSING_UNITS_CONFIGURATIONS(
        Number(rawOperationId),
        Number(rawContractId),
        Number(rawProcessingUnitId)
      ),
      icon: Settings,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.LANES_VIEW)
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
            message={MESSAGES_PROCESSING_UNIT_OPTIONS['18.6']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
