import { Badge } from '@/lib/ui/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { findProvider } from '../../actions/find-provider';
import DeleteCategoryDialog from '../delete/delete-dialog';
import EditProviderSheet from '../edit/sheet';

const DetailsProvider = async ({ id }: { id: string }) => {
  const response = await findProvider({ id });
  const provider = response!.data!;
  return (
    <div className="p-4 w-2/3 flex gap-5">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-start">
              <div className="h-32 w-32 rounded-l-md overflow-hidden rounded-lg">
                <img
                  src={provider.image}
                  alt=""
                  className="h-full w-full object-cover border border-primary rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <CardTitle className="text-2xl">{provider.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
                <div className="flex gap-2 items-center">
                  <Badge>{provider.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}</Badge>
                  <Badge>{provider.type === 'COMPANY' ? 'Empresa' : 'Personal'}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <EditProviderSheet provider={provider} />
              <DeleteCategoryDialog provider={provider} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center"></div>
            <p className="text-xl font-medium">Información de contacto:</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <p>Phone:</p>
                </div>
                <p className="text-sm text-muted-foreground">{provider.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <p>Email:</p>
                </div>
                <p className="text-sm text-muted-foreground">{provider.email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <p>Dirección:</p>
                </div>
                <p className="text-sm text-muted-foreground">{provider.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsProvider;
