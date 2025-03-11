'use client';

import { Button } from '@/lib/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/ui/components/ui/dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteWarehouse } from '../../actions/delete-warehouse';

const DeleteWarehouseDialog = ({ warehouse }: { warehouse: { id: string; name: string; color: string } }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const confirmDelete = async () => {
    try {
      setLoading(true);
      await deleteWarehouse({ id: warehouse.id });
      toast.success('Almacen eliminado correctamente');
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al eliminar el almacén');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          aria-label={`Eliminar ${warehouse.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar la categoria <span className="font-black">{warehouse?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={confirmDelete} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarehouseDialog;
