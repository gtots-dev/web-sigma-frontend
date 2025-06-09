import Image from 'next/image'

export default function Loading() {
  return (
    <main className="grid place-content-center h-svh w-screen">
      <Image
        src="/logos/gtots_principal_hor.svg"
        alt="Logotipo da empresa Traffic Safe"
        className="h-[100px] aspect-auto animate-pulse duration-1000"
        height={100}
        fetchPriority="high"
      />
    </main>
  )
}
