'use client';

import { Button } from '@/lib/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { InputColor } from '@/lib/ui/components/ui/input-color';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveCategory } from '../../actions/save-category';

const formSchema = z.object({
  name: z.string(),
  color: z.string(),
  id: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const EditCategoryForm = ({ category, toggle }: { category: FormSchema; toggle: VoidFunction }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: category,
  });
  const { isSubmitting } = form.formState;

  const submit = async (data: FormSchema) => {
    try {
      await saveCategory(data);
      toast.success('Categoria creada');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error al crear la categoria');
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
                <FormLabel className="text-sm  font-bold ">Nombre</FormLabel>
                <FormControl>
                  <InputColor
                    onChange={(e) => {
                      field.onChange(e.name);
                      form.setValue('color', e.color);
                    }}
                    placeholder="Nombre de la categoria"
                    defaultColor={form.watch(`color`)}
                    defaultValue={form.watch(`name`)}
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Guardar categoria'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
