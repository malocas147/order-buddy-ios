import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddOrderSheetProps {
  onAdd: (order: { clientName: string; product: string; quantity: number; price: number; notes: string }) => void;
}

export function AddOrderSheet({ onAdd }: AddOrderSheetProps) {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !product.trim()) {
      toast.error('Client et produit sont requis');
      return;
    }
    onAdd({
      clientName: clientName.trim(),
      product: product.trim(),
      quantity: parseInt(quantity) || 1,
      price: parseFloat(price) || 0,
      notes: notes.trim(),
    });
    setClientName('');
    setProduct('');
    setQuantity('1');
    setPrice('');
    setNotes('');
    setOpen(false);
    toast.success('Commande ajoutée !');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="rounded-full shadow-lg fixed bottom-6 right-6 h-14 w-14 z-50">
          <Plus className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Nouvelle commande</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client *</Label>
            <Input id="client" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Nom du client" autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product">Produit *</Label>
            <Input id="product" value={product} onChange={e => setProduct(e.target.value)} placeholder="Nom du produit" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité</Label>
              <Input id="quantity" type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input id="price" type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Détails supplémentaires..." rows={2} />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Ajouter la commande
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
