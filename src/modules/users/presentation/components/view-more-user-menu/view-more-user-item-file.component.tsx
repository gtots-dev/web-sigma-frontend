import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Download } from 'lucide-react'

interface ViewMoreUserItemFileComponentProps {
  fileName: string
  title: string
  action?: VoidFunction
}

export function ViewMoreUserItemFileComponent({
  fileName,
  title,
  action
}: ViewMoreUserItemFileComponentProps) {
  return (
    <section className="flex items-center justify-between w-full h-[60px] gap-4 rounded-md border border-input p-3.5">
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <h4 className="text-xs truncate">{title}:</h4>
        <span
          className="text-sm underline underline-offset-4 opacity-80 truncate"
          title={fileName}
        >
          {fileName}
        </span>
      </div>
      {action && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={action}
          aria-label={`Download ${fileName}`}
        >
          <Download className="w-4 h-4" />
        </Button>
      )}
    </section>
  )
}
