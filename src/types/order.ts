export type OrderStatus = 'new' | 'production' | 'to_deliver' | 'delivered' | 'paid';

export interface Order {
  id: string;
  clientName: string;
  product: string;
  quantity: number;
  price: number;
  notes: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; next: OrderStatus | null }> = {
  new: { label: 'Nouvelle', color: 'accent', next: 'production' },
  production: { label: 'En production', color: 'production', next: 'to_deliver' },
  to_deliver: { label: 'À livrer', color: 'warning', next: 'delivered' },
  delivered: { label: 'Livrée', color: 'delivered', next: 'paid' },
  paid: { label: 'Encaissée', color: 'paid', next: null },
};
