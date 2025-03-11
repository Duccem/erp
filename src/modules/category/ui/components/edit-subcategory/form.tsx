'use client';

import { Button } from '@/lib/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { InputColor } from '@/lib/ui/components/ui/input-color';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveSubCategory } from '../../actions/add-subcategory';

const formSchema = z.object({
  name: z.string(),
  color: z.string(),
  id: z.string(),
  categoryId: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const EditSubCategoryForm = ({ subCategory, toggle }: { subCategory: FormSchema; toggle: VoidFunction }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: subCategory,
  });
  const { isSubmitting } = form.formState;

  const submit = async (data: FormSchema) => {
    try {
      await saveSubCategory(data);
      toast.success('Subcategoria guardada');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error al guardar la subcategoria');
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
                    placeholder="Nombre de la sub categoria"
                    defaultColor={form.watch(`color`)}
                    defaultValue={form.watch(`name`)}
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Guardar sub categoria'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditSubCategoryForm;
