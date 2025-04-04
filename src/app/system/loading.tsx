export default async function Loading() {
  return (
    <main className="grid place-content-center gap-3 h-full w-full shrink-0">
      <img
        src="/logos/gtots_principal_hor.svg"
        className="aspect-auto animate-pulse duration-1000"
        height={100}
        width="auto"
        fetchPriority="high"
      />
    </main>
  )
}
