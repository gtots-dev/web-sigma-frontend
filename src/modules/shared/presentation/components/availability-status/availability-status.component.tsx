interface AvailabilityStatusComponentProps {
  enabled: boolean
}

export function AvailabilityStatusComponent({
  enabled
}: AvailabilityStatusComponentProps) {
  return (
    <div
      className={`flex justify-start items-center gap-x-3 p-1 px-2.5 border rounded-full ${enabled ? 'w-[100px]' : 'w-[110px]'}`}
    >
      {!enabled ? (
        <span className="block bg-red-500 outline-2 outline outline-red-600 h-1 w-1 rounded-full"></span>
      ) : (
        <span className="block bg-green-500 outline-2 outline outline-green-600 h-1 w-1 rounded-full"></span>
      )}
      <span className="text-xs">{enabled ? 'Habilitado' : 'Desabilitado'}</span>
    </div>
  )
}
