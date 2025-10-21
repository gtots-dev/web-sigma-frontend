interface FrameOptionsNotFoundComponentProps {
  message: string
}

export function FrameOptionsNotFoundComponent({
  message
}: FrameOptionsNotFoundComponentProps) {
  return (
    <div className="flex justify-center items-center w-full px-4 py-10 bg-zinc-100 dark:bg-zinc-950/50 rounded-lg border">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
