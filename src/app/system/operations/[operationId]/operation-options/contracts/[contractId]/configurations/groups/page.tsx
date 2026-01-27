import { auth } from '@/auth'
import { GroupOptionsDropdown } from '@/modules/groups/presentation/components/group-options-dropdown'
import { PostGroupMenu } from '@/modules/groups/presentation/components/post-group-menu'
import { TableGroups } from '@/modules/groups/presentation/components/table-groups'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'

interface GroupsPageProps {
  params: Promise<UrlParams>
}

interface Data {
  title: string
  description: string
  menuPostGroupTitle: string
  menuPostGroupDescription: string
  menuPatchGroupTitle: string
  menuPatchGroupDescription: string
  menuPatchGroupStatusTitle: string
  menuPatchGroupStatusDescription: string
  menuPostGroupLaneTitle: string
  menuPostGroupLaneDescription: string
  menuPostGroupPointTitle: string
  menuPostGroupPointDescription: string
  menuPostGroupSubgroupTitle: string
  menuPostGroupSubgroupDescription: string
  menuViewMoreGroupTitle: string
  menuViewMoreGroupDescription: string
}

export default async function GroupsPage({ params }: GroupsPageProps) {
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
    title: MESSAGES_GROUP['18.1'],
    description: MESSAGES_GROUP['18.2'],
    menuPostGroupTitle: MESSAGES_GROUP['18.4'],
    menuPostGroupDescription: MESSAGES_GROUP['18.5'],
    menuPatchGroupTitle: MESSAGES_GROUP['18.7'],
    menuPatchGroupDescription: MESSAGES_GROUP['18.8'],
    menuPatchGroupStatusTitle: MESSAGES_GROUP['18.9'],
    menuPatchGroupStatusDescription: MESSAGES_GROUP['18.10'],
    menuPostGroupLaneTitle: MESSAGES_GROUP['18.11'],
    menuPostGroupLaneDescription: MESSAGES_GROUP['18.12'],
    menuPostGroupPointTitle: MESSAGES_GROUP['18.17'],
    menuPostGroupPointDescription: MESSAGES_GROUP['18.18'],
    menuPostGroupSubgroupTitle: MESSAGES_GROUP['18.19'],
    menuPostGroupSubgroupDescription: MESSAGES_GROUP['18.20'],
    menuViewMoreGroupTitle: MESSAGES_GROUP['18.15'],
    menuViewMoreGroupDescription: MESSAGES_GROUP['18.16']
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
        <PostGroupMenu.Provider>
          <PostGroupMenu.Client
            isAdmin={isAdmin}
            permissions={userPermissions}
            title={data.menuPostGroupTitle}
            description={data.menuPostGroupDescription}
          />
        </PostGroupMenu.Provider>
      </ActionSection.Root>
      <TableGroups.Root>
        <TableGroups.Header />
        <TableGroups.Body>
          <TableGroups.Item>
            <GroupOptionsDropdown.Client
              isAdmin={isAdmin}
              patchTitle={data.menuPatchGroupTitle}
              patchDescription={data.menuPatchGroupDescription}
              patchStatusTitle={data.menuPatchGroupStatusTitle}
              patchStatusDescription={data.menuPatchGroupStatusDescription}
              postGroupLaneTitle={data.menuPostGroupLaneTitle}
              postGroupLaneDescription={data.menuPostGroupLaneDescription}
              postGroupPointTitle={data.menuPostGroupPointTitle}
              postGroupPointDescription={data.menuPostGroupPointDescription}
              postGroupSubgroupTitle={data.menuPostGroupSubgroupTitle}
              postGroupSubgroupDescription={
                data.menuPostGroupSubgroupDescription
              }
              viewMoreGroupLaneTitle={data.menuViewMoreGroupTitle}
              ViewMoreGroupLaneDescription={data.menuViewMoreGroupDescription}
              permissions={userPermissions}
            />
          </TableGroups.Item>
        </TableGroups.Body>
      </TableGroups.Root>
    </main>
  )
}
