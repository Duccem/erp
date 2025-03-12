'use client';

import { Primitives } from '@/lib/ddd/types/primitives';
import { createClient } from '@/lib/supabase/client';
import { upload } from '@/lib/supabase/storage';
import { Button } from '@/lib/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui/components/ui/select';
import { Textarea } from '@/lib/ui/components/ui/textarea';
import { Provider } from '@/modules/provider/domain/provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveProvider } from '../../actions/save-provider';

const types = [
  { value: 'COMPANY', label: 'Empresa' },
  { value: 'PERSON', label: 'Persona' },
];

const states = [
  { value: 'ACTIVE', label: 'Activo' },
  { value: 'INACTIVE', label: 'Inactivo' },
];

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const EditProviderForm = ({ toggle, provider }: { toggle: VoidFunction; provider: Primitives<Provider> }) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: provider,
  });
  const { isSubmitting } = form.formState;

  const submit = async (data: FormSchema) => {
    try {
      let image = provider.image;
      if (selectedFile) {
        const client = createClient();
        image = await upload(client, {
          file: selectedFile,
          path: ['providers', 'logos', selectedFile.name],
          bucket: 'assets',
        });
      }

      await saveProvider({
        image,
        ...data,
      });
      toast.success('Proveedor creado correctamente');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al crear el proveedor');
    }
  };
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(submit, (e) => console.log(e))}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="h-32 w-32 rounded-l-md overflow-hidden rounded-lg">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                  className="h-full w-full object-cover border border-dashed border-primary rounded-lg"
                />
              ) : (
                <img
                  src={provider.image}
                  alt=""
                  className="h-full w-full object-cover border border-dashed border-primary rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    inputFileRef.current?.click();
                  }}
                >
                  Cambiar logo
                </Button>
              </div>
              <p className="text-sm font-medium">Agrega un logo al proveedor</p>
              <p className="text-xs text-muted-foreground">
                Puedes subir un archivo .png, .jpg, .jpeg, .svg con un tamaño máximo de 1MB
              </p>
            </div>
            <input
              ref={inputFileRef}
              type="file"
              className="hidden"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={(e) => setSelectedFile(e.target.files?.[0])}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del proveedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Descripcion</FormLabel>
                <FormControl>
                  <Textarea placeholder="Información del proveedor" {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Tipo de proveedor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un tipo de proveedor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className="flex w-full justify-between items-center gap-3">{type.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Indica el estatus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          <span className="flex w-full justify-between items-center gap-3">{state.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono del proveedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="Correo del proveedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección del proveedor" {...field} />
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

export default EditProviderForm;
