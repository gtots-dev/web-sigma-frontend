import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'

interface LoadingSpinComponentProps extends ComponentProps<'svg'> {
  loading?: boolean
}

export function LoadingSpinComponent({
  loading = false,
  ...props
}: LoadingSpinComponentProps) {
  if (!loading) return null

  return <LoaderCircle className="animate-spin" {...props} />
}
