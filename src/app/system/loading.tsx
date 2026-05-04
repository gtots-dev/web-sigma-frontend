import Image from 'next/image'
import logo from '@/../public/logos/gtots_principal_hor.svg'

export default function Loading() {
  return (
    <main className="grid place-content-center gap-3 h-full w-full shrink-0">
      <Image
        src={logo}
        alt="Logotipo da empresa Traffic Safe"
        className="aspect-auto animate-pulse duration-1000"
        height={100}
        width={250}
        priority
      />
    </main>
  )
}
