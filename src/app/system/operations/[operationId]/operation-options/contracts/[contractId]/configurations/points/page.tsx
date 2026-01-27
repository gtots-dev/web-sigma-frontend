import { auth } from '@/auth'
import { PointOptionsDropdown } from '@/modules/points/presentation/components/point-options-dropdown'
import { PostPointMenu } from '@/modules/points/presentation/components/post-point-menu'
import { PostPointMenuComponent } from '@/modules/points/presentation/components/post-point-menu/post-point-menu.component'
import { TablePoints } from '@/modules/points/presentation/components/table-points'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'

interface PointsPageProps {
  params: Promise<UrlParams>
}

interface Data {
  title: string
  description: string
  menuPostPointTitle: string
  menuPostPointDescription: string
  menuPatchPointTitle: string
  menuPatchPointDescription: string
  menuPatchPointStatusTitle: string
  menuPatchPointStatusDescription: string
  menuPostPointLaneTitle: string
  menuPostPointLaneDescription: string
  menuViewMorePointTitle: string
  menuViewMorePointDescription: string
}

export default async function PointsPage({ params }: PointsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  const data: Data = {
    title: MESSAGES_POINT['14.1'],
    description: MESSAGES_POINT['14.2'],
    menuPostPointTitle: MESSAGES_POINT['14.4'],
    menuPostPointDescription: MESSAGES_POINT['14.5'],
    menuPatchPointTitle: MESSAGES_POINT['14.7'],
    menuPatchPointDescription: MESSAGES_POINT['14.8'],
    menuPatchPointStatusTitle: MESSAGES_POINT['14.9'],
    menuPatchPointStatusDescription: MESSAGES_POINT['14.10'],
    menuPostPointLaneTitle: MESSAGES_POINT['14.11'],
    menuPostPointLaneDescription: MESSAGES_POINT['14.12'],
    menuViewMorePointTitle: MESSAGES_POINT['14.15'],
    menuViewMorePointDescription: MESSAGES_POINT[14.16]
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <div className="flex gap-5 flex-col lg:flex-row">
        <SectionRedirectLink.Button href={previousSection} />
        <HeaderSection.Root>
          <HeaderSection.Title>{data.title}</HeaderSection.Title>
          <HeaderSection.Description>
            {data.description}
          </HeaderSection.Description>
        </HeaderSection.Root>
      </div>
      <Separator orientation="horizontal" />
      <ActionSection.Root>
        <PostPointMenu.Provider>
          <PostPointMenu.Trigger />
          <PostPointMenuComponent
            title={data.menuPostPointTitle}
            description={data.menuPostPointDescription}
          />
        </PostPointMenu.Provider>
      </ActionSection.Root>
      <TablePoints.Root>
        <TablePoints.Header />
        <TablePoints.Body>
          <TablePoints.Item>
            <PointOptionsDropdown.Client
              isAdmin={isAdmin}
              patchTitle={data.menuPatchPointTitle}
              patchDescription={data.menuPatchPointDescription}
              patchStatusTitle={data.menuPatchPointStatusTitle}
              patchStatusDescription={data.menuPatchPointStatusDescription}
              postPointLaneTitle={data.menuPostPointLaneTitle}
              postPointLaneDescription={data.menuPostPointLaneDescription}
              viewMorePointLaneTitle={data.menuViewMorePointTitle}
              ViewMorePointLaneDescription={data.menuViewMorePointDescription}
              permissions={userPermissions}
            />
          </TablePoints.Item>
        </TablePoints.Body>
      </TablePoints.Root>
    </main>
  )
}
