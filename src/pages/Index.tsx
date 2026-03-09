import { useState, useMemo } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { OrderStatus, STATUS_CONFIG } from '@/types/order';
import { OrderCard } from '@/components/OrderCard';
import { AddOrderSheet } from '@/components/AddOrderSheet';
import { StatusFilter } from '@/components/StatusFilter';
import { ClipboardList } from 'lucide-react';

const Index = () => {
  const { orders, addOrder, updateStatus, deleteOrder } = useOrders();
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) {
      c[o.status] = (c[o.status] || 0) + 1;
    }
    return c;
  }, [orders]);

  const filtered = useMemo(
    () => (filter === 'all' ? orders : orders.filter(o => o.status === filter)),
    [orders, filter]
  );

  const totalUnpaid = useMemo(
    () => orders.filter(o => o.status !== 'paid').reduce((sum, o) => sum + o.price, 0),
    [orders]
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="px-5 pt-12 pb-5">
          <h1 className="font-display text-2xl font-bold">Mes Commandes</h1>
          <p className="text-sm opacity-80 mt-1">
            {orders.length} commande{orders.length !== 1 ? 's' : ''}
            {totalUnpaid > 0 && (
              <span className="ml-2">
                · <span className="font-semibold">{totalUnpaid.toLocaleString('fr-FR')} €</span> à encaisser
              </span>
            )}
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="px-5 py-4">
        <StatusFilter active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Order List */}
      <div className="px-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <ClipboardList className="h-16 w-16 mb-4 opacity-30" />
            <p className="font-display text-lg font-medium">Aucune commande</p>
            <p className="text-sm mt-1">Appuyez sur + pour en ajouter une</p>
          </div>
        ) : (
          filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAdvance={() => {
                const next = STATUS_CONFIG[order.status].next;
                if (next) updateStatus(order.id, next);
              }}
              onDelete={() => deleteOrder(order.id)}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <AddOrderSheet onAdd={addOrder} />
    </div>
  );
};

export default Index;
