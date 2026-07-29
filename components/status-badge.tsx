import { STATUS_LABEL, type StatusInfo } from '@/lib/data'
import { cn } from '@/lib/utils'

export function StatusBadge({
  status,
  className,
}: {
  status: StatusInfo
  className?: string
}) {
  const styles: Record<StatusInfo, string> = {
    validado: 'bg-primary/10 text-primary',
    'em-validacao': 'bg-river/10 text-river',
    demonstrativo: 'bg-sand/60 text-secondary-foreground',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide',
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  )
}
