export default function Loading() {
  return (
    <main className="grid place-content-center h-svh w-screen">
      <img
        src="/logos/gtots_principal_hor.svg"
        className="h-[100px] aspect-auto animate-pulse duration-1000"
        height={100}
        width="auto"
        fetchPriority="high"
      />
    </main>
  )
}
