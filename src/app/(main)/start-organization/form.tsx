'use client';
import { authClient } from '@/lib/auth/client';
import { createClient } from '@/lib/supabase/client';
import { upload } from '@/lib/supabase/storage';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().nonempty(),
});

type FormValues = z.infer<typeof formSchema>;

const OrganizationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const { isSubmitting } = form.formState;

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    try {
      if (!selectedFile) {
        return toast.error('Debes seleccionar un logo para tu organización');
      }
      const client = createClient();
      const imageUploaded = await upload(client, {
        file: selectedFile,
        path: ['organizations', 'logos', selectedFile.name],
        bucket: 'assets',
      });

      await authClient.organization.create({
        name: values.name,
        logo: imageUploaded,
        slug: values.name.toLowerCase().replace(/\s/g, '-'),
      });

      toast.success('Organización creada correctamente');

      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al crear la organización');
    }
  };

  return (
    <Form {...form}>
      <form action="" className="w-1/3" onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg font-semibold">Crear organización</h2>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Para comenzar a utilizar la aplicación, primero debes crear una organización.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex gap-3 items-center">
              <div className="h-32 w-32 rounded-l-md overflow-hidden rounded-lg">
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt=""
                    className="h-full w-full object-cover border border-dashed border-primary rounded-lg"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center  text-muted-foreground border border-dashed border-primary rounded-lg">
                    <Camera />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <Button
                    onClick={() => {
                      inputFileRef.current?.click();
                    }}
                  >
                    {selectedFile ? 'Cambiar logo' : 'Seleccionar logo'}
                  </Button>
                </div>
                <p className="text-sm font-medium">Selecciona un logo para tu organización</p>
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
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre de la organización" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Crear organización'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default OrganizationForm;
