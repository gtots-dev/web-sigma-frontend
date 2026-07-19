interface InfractionDescriptionPlateProps {
  value: string
}

export function InfractionDescriptionPlate({ value }: InfractionDescriptionPlateProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
        Placa
      </span>
      <span className="text-xl font-bold font-mono tracking-widest text-foreground">
        {value.toUpperCase()}
      </span>
    </div>
  )
}

