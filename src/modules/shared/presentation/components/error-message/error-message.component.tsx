interface ErrorMessageComponentProps {
  error?: string
}

export function ErrorMessageComponent({ error }: ErrorMessageComponentProps) {
  if (!error) return null

  return (
    <p className="text-red-500 text-sm mt-2 transition duration-300 ease-in">
      {error}
    </p>
  )
}
