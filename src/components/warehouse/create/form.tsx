'use client';

import { Button } from '@/lib/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';
import { saveWarehouse } from '../../../actions/warehouse/save-warehouse';

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateWarehouseForm = ({ toggle }: { toggle: VoidFunction }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });
  const { isSubmitting } = form.formState;

  const submit = async (data: FormSchema) => {
    try {
      await saveWarehouse({ ...data, id: v4() });
      toast.success('Warehouse created');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error creating warehouse');
    }
  };
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(submit, (e) => console.log(e))}>
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Warehouse name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Address</FormLabel>
                <FormControl>
                  <Input placeholder="Warehouse address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save warehouse'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateWarehouseForm;
