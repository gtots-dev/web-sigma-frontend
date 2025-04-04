export default async function Loading() {
  return (
    <main className="grid place-content-center gap-3 h-full w-full shrink-0">
      <img
        src="/logos/gtots_principal_hor.svg"
        alt="Loading spinner"
        width="100%"
        height="100%"
        className="h-[100px] aspect-auto animate-pulse duration-1000"
      />
    </main>
  )
}
