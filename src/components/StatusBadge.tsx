import { OrderStatus, STATUS_CONFIG } from '@/types/order';
import { cn } from '@/lib/utils';

const colorMap: Record<string, string> = {
  accent: 'bg-accent text-accent-foreground',
  production: 'bg-production text-production-foreground',
  warning: 'bg-warning text-warning-foreground',
  delivered: 'bg-delivered text-delivered-foreground',
  paid: 'bg-paid text-paid-foreground',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        colorMap[config.color]
      )}
    >
      {config.label}
    </span>
  );
}
