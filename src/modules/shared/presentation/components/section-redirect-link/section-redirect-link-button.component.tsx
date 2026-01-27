import Link from 'next/link'
import { Button } from '../shadcn/button'
import { CornerUpLeft } from 'lucide-react'

interface SectionRedirectLinkButtonComponentProps {
  href: string
}

export function SectionRedirectLinkButtonComponent({
  href
}: SectionRedirectLinkButtonComponentProps) {
  return (
    <Button className="lg:!w-[38px] h-auto self-stretch" variant="outline" asChild>
      <Link href={href} aria-label="Voltar">
        <CornerUpLeft size={4} />
        <span className="lg:hidden">Voltar</span>
      </Link>
    </Button>
  )
}
