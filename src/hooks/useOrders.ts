import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types/order';

const STORAGE_KEY = 'production-orders';

function loadOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const addOrder = (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return { orders, addOrder, updateStatus, deleteOrder };
}
