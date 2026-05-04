import Image from 'next/image'
import LoadingLogo from '@/../public/logos/gtots_principal_hor.svg'

export default function Loading() {
  return (
    <main className="grid place-content-center h-svh w-screen">
      <Image
        src={LoadingLogo}
        alt="Logotipo da empresa Traffic Safe"
        className="h-[100px] aspect-auto animate-pulse duration-1000"
        height={100}
        width={250}
        fetchPriority="high"
      />
    </main>
  )
}
