import { Order, STATUS_CONFIG } from '@/types/order';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trash2, Package, User, Hash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OrderCardProps {
  order: Order;
  onAdvance: () => void;
  onDelete: () => void;
}

export function OrderCard({ order, onAdvance, onDelete }: OrderCardProps) {
  const config = STATUS_CONFIG[order.status];
  const nextConfig = config.next ? STATUS_CONFIG[config.next] : null;

  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={order.status} />
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: fr })}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-display font-semibold text-foreground truncate">{order.clientName}</span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <Package className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground truncate">{order.product}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Hash className="h-3.5 w-3.5" />
              {order.quantity}
            </span>
            {order.price > 0 && (
              <span className="font-semibold text-foreground">
                {order.price.toLocaleString('fr-FR')} €
              </span>
            )}
          </div>

          {order.notes && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 italic">
              {order.notes}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {nextConfig && (
            <Button
              size="sm"
              onClick={onAdvance}
              className="text-xs gap-1"
            >
              {nextConfig.label}
              <ArrowRight className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
