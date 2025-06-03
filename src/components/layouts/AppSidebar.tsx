
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  MessageSquare,
  Smartphone,
  UserCog,
  User,
  ChevronDown,
  UserPlus,
  Upload,
  Contact
} from 'lucide-react';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SupportCard } from '@/components/dashboard/SupportCard';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: MenuItem[];
  adminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Leads',
    href: '/dashboard/leads',
    icon: Users,
    children: [
      {
        title: 'Contatos',
        href: '/dashboard/leads',
        icon: Contact
      },
      {
        title: 'Importar',
        href: '/dashboard/leads/import',
        icon: Upload
      }
    ]
  },
  {
    title: 'Automação',
    href: '/dashboard/agents',
    icon: MessageSquare
  },
  {
    title: 'Conectar',
    href: '/dashboard/connect',
    icon: Smartphone
  },
  {
    title: 'Conversas',
    href: '/dashboard/messages',
    icon: MessageSquare
  },
  {
    title: 'Administração',
    href: '/admin',
    icon: UserCog,
    adminOnly: true
  },
  {
    title: 'Usuários',
    href: '/admin/usuarios',
    icon: User,
    adminOnly: true,
    children: [
      {
        title: 'Cadastros',
        href: '/admin/usuarios/cadastros',
        icon: UserPlus,
        adminOnly: true
      },
      {
        title: 'Tipos de Usuários',
        href: '/admin/usuarios/tipos',
        icon: UserCog,
        adminOnly: true
      }
    ]
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const [usersOpen, setUsersOpen] = useState(location.pathname.startsWith('/admin/usuarios'));
  const [leadsOpen, setLeadsOpen] = useState(location.pathname.startsWith('/dashboard/leads'));

  const isActive = (href: string) => location.pathname === href;
  const isUsersMenu = location.pathname.startsWith('/admin/usuarios');
  const isLeadsMenu = location.pathname.startsWith('/dashboard/leads');

  // Verificar se o usuário tem acesso admin - padronizada
  const hasAdminAccess = user && (
    user.role === 'admin' || 
    user.role === 'manager' || 
    user.nivelUsuarioId === 1
  );

  console.log('AppSidebar - Admin access check:', { 
    hasAdminAccess, 
    userRole: user?.role, 
    nivelUsuarioId: user?.nivelUsuarioId,
    user: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      nivelUsuarioId: user.nivelUsuarioId,
      empresaId: user.empresaId
    } : null 
  });

  // Filtrar itens do menu baseado nas permissões do usuário
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !hasAdminAccess) {
      return false;
    }
    return true;
  });

  console.log('AppSidebar - Filtered menu items:', filteredMenuItems.map(item => item.title));

  return (
    <Sidebar className="border-r border-gray-100">
      <SidebarHeader className="border-b border-gray-100 p-6 bg-gradient-to-r from-brand-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand">
            <img 
              src="/brand-logo.svg" 
              alt="Odontomy Brand" 
              className="w-6 h-6"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Odontomy
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50/30">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-4">
              {filteredMenuItems.map((item) => {
                // Handle Leads menu with children
                if (item.title === 'Leads' && item.children) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isLeadsMenu}
                        onClick={() => setLeadsOpen(o => !o)}
                        className={cn(
                          "h-12 text-base rounded-xl transition-all duration-200 group relative overflow-hidden flex items-center justify-between",
                          isLeadsMenu ? "bg-gradient-brand text-white shadow-brand hover:shadow-lg" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", leadsOpen ? "rotate-180" : "")}/>
                      </SidebarMenuButton>
                      {leadsOpen && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={location.pathname === child.href}
                                className={cn(
                                  "h-10 text-base rounded-lg transition-all duration-200 group relative overflow-hidden",
                                  location.pathname === child.href ? "bg-gradient-brand text-white" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                                )}
                              >
                                <Link to={child.href} className="flex items-center w-full">
                                  <child.icon className="w-4 h-4 mr-2" /> {child.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                }

                // Handle Usuários menu with children (only if has admin access)
                if (item.title === 'Usuários' && item.children && hasAdminAccess) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isUsersMenu}
                        onClick={() => setUsersOpen(o => !o)}
                        className={cn(
                          "h-12 text-base rounded-xl transition-all duration-200 group relative overflow-hidden flex items-center justify-between",
                          isUsersMenu ? "bg-gradient-brand text-white shadow-brand hover:shadow-lg" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", usersOpen ? "rotate-180" : "")}/>
                      </SidebarMenuButton>
                      {usersOpen && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={location.pathname.includes(child.href)}
                                className={cn(
                                  "h-10 text-base rounded-lg transition-all duration-200 group relative overflow-hidden",
                                  location.pathname.includes(child.href) ? "bg-gradient-brand text-white" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                                )}
                              >
                                <Link to={child.href} className="flex items-center w-full">
                                  <child.icon className="w-4 h-4 mr-2" /> {child.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                }

                // Handle all other menu items (single level)
                if (!item.children) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton 
                        asChild
                        isActive={isActive(item.href)}
                        className={cn(
                          "h-12 text-base rounded-xl transition-all duration-200 group relative overflow-hidden",
                          isActive(item.href) 
                            ? "bg-gradient-brand text-white shadow-brand hover:shadow-lg" 
                            : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <Link to={item.href} className="flex items-center w-full">
                          <item.icon className={cn(
                            "w-5 h-5 mr-3",
                            isActive(item.href) ? "text-white" : ""
                          )} />
                          <span className={cn(
                            "font-medium",
                            isActive(item.href) ? "text-white" : ""
                          )}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return null;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <SupportCard />
      </SidebarFooter>
    </Sidebar>
  );
}
