'use client';
import LogoMin from '@/components/shared/logo-min';
import { Button } from '@/lib/ui/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/lib/ui/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from '@/lib/ui/components/ui/sidebar';
import { cn } from '@/lib/ui/lib/utils';
import { motion } from 'framer-motion';
import { Building, ChevronRight, Coins, Home, SidebarIcon, Warehouse } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Fragment, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const AppSidebar = () => {
  const [sidebar, setSidebar] = useLocalStorage('sidebar', true);
  const [role] = useLocalStorage('role', 'USER');
  const { open, state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const path = usePathname();
  useEffect(() => {
    setSidebar(sidebar);
  }, [open]);
  const sections = sidebarItems
    .filter((group) => group.roles.includes(role))
    .map((section) => ({
      title: section.title,
      items: section.routes
        .filter((route) => route.roles.includes(role))
        .map((route) => ({
          title: route.title,
          href: route.href,
          icon: route.icon,
          isActive: route.isActive,
          routes: route.routes ? route.routes.filter((route) => route.roles.includes(role)) : null,
        })),
    }));
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader
        className={cn(
          'flex md:pt-3.5',
          isCollapsed ? 'items-center justify-between gap-y-4 flex-col' : 'flex-row items-center justify-between'
        )}
      >
        <Link href={'/'}>
          <LogoMin />
        </Link>
        <motion.div
          key={isCollapsed ? 'header-collapsed' : 'header-expanded'}
          className={`flex ${isCollapsed ? 'flex-row md:flex-col-reverse' : 'flex-row'} items-center gap-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <motion.div
          key={isCollapsed ? 'nav-collapsed' : 'nav-expanded'}
          className={`flex flex-col items-center gap-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {sections.map((section, index) => (
            <SidebarGroup key={`${section.title}-${index}`} title={section.title}>
              <SidebarGroupLabel className="text-muted-foreground">{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item, index) => (
                    <Fragment key={`${item.title}-${index}`}>
                      {item.routes ? (
                        <Collapsible
                          className="group/collapsible"
                          defaultOpen={item.routes.some((subItem) => {
                            return path == subItem.href;
                          })}
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                className={cn({
                                  'border  bg-sidebar-accent': item.routes.some((subItem) => {
                                    return path == subItem.href;
                                  }),
                                })}
                              >
                                {<item.icon />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-200">
                              <SidebarMenuSub>
                                {item.routes?.map((subItem: any) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        prefetch={true}
                                        href={subItem.href}
                                        className={cn('hover:bg-sidebar hover:border', {
                                          'border  bg-sidebar-accent': path == subItem.href,
                                        })}
                                      >
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            className={cn({
                              'border  bg-sidebar-accent': path == item.href,
                            })}
                          >
                            <Link href={item.href} prefetch={true}>
                              {<item.icon />}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </Fragment>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
};

export const AppSidebarButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('w-10 h-10 border p-4 cursor-pointer')}
      onClick={(event) => {
        toggleSidebar();
      }}
    >
      <SidebarIcon className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

const sidebarItems = [
  {
    title: 'General',
    roles: ['USER', 'ADMIN'],
    routes: [
      {
        icon: Home,
        title: 'Inicio',
        href: '/',
        roles: ['USER', 'ADMIN'],
      },
      {
        icon: Warehouse,
        title: 'Almacén',
        href: '',
        roles: ['USER', 'ADMIN'],
        isActive: true,
        routes: [
          {
            title: 'Productos',
            href: '/products',
            roles: ['USER', 'ADMIN'],
          },
          {
            title: 'Categorías',
            href: '/categories',
            roles: ['USER', 'ADMIN'],
          },
          {
            title: 'Proveedores',
            href: '/providers',
            roles: ['USER', 'ADMIN'],
          },
          {
            title: 'Almacenes',
            href: '/warehouses',
            roles: ['USER', 'ADMIN'],
          },
        ],
      },
      {
        icon: Coins,
        title: 'Finanzas',
        href: '/finance',
        roles: ['ADMIN', 'USER'],
        isActive: false,
        routes: [
          {
            title: 'Ventas',
            href: '/finance/sales',
            roles: ['ADMIN', 'USER'],
          },
          {
            title: 'Compras',
            href: '/finance/purchases',
            roles: ['ADMIN', 'USER'],
          },
          {
            title: 'Facturas',
            href: '/finance/invoices',
            roles: ['ADMIN', 'USER'],
          },
          {
            title: 'Cuentas',
            href: '/finance/accounts',
            roles: ['ADMIN', 'USER'],
          },
        ],
      },
    ],
  },
  {
    title: 'Configuración',
    roles: ['ADMIN', 'USER'],
    routes: [
      {
        title: 'Organización',
        icon: Building,
        href: '/organization',
        roles: ['ADMIN', 'USER'],
      },
    ],
  },
];
