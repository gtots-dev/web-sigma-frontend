import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

export default function SystemPage() {
  redirect(PATHNAMES.OPERATIONS)
}
