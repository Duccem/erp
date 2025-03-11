'use client';
import { usePathname } from 'next/navigation';
import { Fragment, ReactElement } from 'react';
import { validate } from 'uuid';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

const translations: Record<string, string> = {
  home: 'Inicio',
  details: 'Detalles',
  categories: 'Categorías',
  products: 'Productos',
  providers: 'Proveedores',
  warehouses: 'Almacenes',
  finance: 'Finanzas',
  sales: 'Ventas',
  purchases: 'Compras',
};

const AppBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;
  for (let i = 0; i < pathNames.length; i++) {
    const route = pathNames[i];
    const href = `/${pathNames.at(0)}/${route}`;
    if (i === pathNames.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{validate(route) ? 'Detalles' : translations[route]}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className="capitalize">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>
      );
    }
  }

  return (
    <Breadcrumb className="px-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
