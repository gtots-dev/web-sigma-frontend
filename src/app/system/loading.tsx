import Image from 'next/image'

export default async function Loading() {
  return (
    <main className="grid place-content-center gap-3 h-full w-full shrink-0">
      <Image
        src="/logos/gtots_principal_hor.svg"
        alt="Logotipo da empresa Traffic Safe"
        className="aspect-auto animate-pulse duration-1000"
        height={100}
        fetchPriority="high"
      />
    </main>
  )
}
