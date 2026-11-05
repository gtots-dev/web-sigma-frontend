import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import PointsPage from './page'

interface PointsPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: PointsPageProps) {
  return <PointsPage {...params} />
}
