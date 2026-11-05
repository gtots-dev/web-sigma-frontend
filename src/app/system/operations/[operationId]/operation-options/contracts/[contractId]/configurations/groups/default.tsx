import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import GroupsPage from './page'

interface GroupsPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: GroupsPageProps) {
  return <GroupsPage {...params} />
}
