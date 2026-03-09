import { OrderStatus, STATUS_CONFIG } from '@/types/order';
import { cn } from '@/lib/utils';

const allStatuses: (OrderStatus | 'all')[] = ['all', 'new', 'production', 'to_deliver', 'delivered', 'paid'];

interface StatusFilterProps {
  active: OrderStatus | 'all';
  onChange: (status: OrderStatus | 'all') => void;
  counts: Record<string, number>;
}

export function StatusFilter({ active, onChange, counts }: StatusFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allStatuses.map(s => {
        const isActive = active === s;
        const label = s === 'all' ? 'Toutes' : STATUS_CONFIG[s].label;
        const count = s === 'all' ? counts['all'] || 0 : counts[s] || 0;

        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {label}
            <span className={cn(
              'ml-1.5 text-xs',
              isActive ? 'opacity-80' : 'opacity-50'
            )}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
