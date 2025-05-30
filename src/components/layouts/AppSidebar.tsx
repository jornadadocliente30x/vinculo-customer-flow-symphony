import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  Bot,
  MessageSquare,
  Smartphone,
  UserCog,
  User,
  ChevronDown,
  UserPlus
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

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: MenuItem[];
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
    icon: Users
  },
  {
    title: 'Automação',
    href: '/dashboard/automations/agents',
    icon: Bot
  },
  {
    title: 'Conectar',
    href: '/dashboard/connect',
    icon: Smartphone
  },
  {
    title: 'Conversas',
    href: '/dashboard/messages/whatsapp',
    icon: MessageSquare
  },
  {
    title: 'Administração',
    href: '/admin',
    icon: UserCog
  },
  {
    title: 'Usuários',
    href: '/admin/usuarios',
    icon: User,
    children: [
      {
        title: 'Cadastros',
        href: '/admin/usuarios/cadastros',
        icon: UserPlus
      },
      {
        title: 'Tipos de Usuários',
        href: '/admin/usuarios/tipos',
        icon: UserCog
      }
    ]
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [usersOpen, setUsersOpen] = useState(location.pathname.startsWith('/admin/usuarios'));

  const isActive = (href: string) => location.pathname === href;
  const isUsersMenu = location.pathname.startsWith('/admin/usuarios');

  return (
    <Sidebar className="border-r border-gray-100">
      <SidebarHeader className="border-b border-gray-100 p-6 bg-gradient-to-r from-brand-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Vinculo
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50/30">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-4">
              {menuItems.filter(item => !item.children).map((item) => (
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
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isUsersMenu}
                  onClick={() => setUsersOpen(o => !o)}
                  className={cn(
                    "h-12 text-base rounded-xl transition-all duration-200 group relative overflow-hidden flex items-center justify-between",
                    isUsersMenu ? "bg-gradient-brand text-white shadow-brand hover:shadow-lg" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3" />
                    <span className="font-medium">Usuários</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", usersOpen ? "rotate-180" : "")}/>
                </SidebarMenuButton>
                {usersOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin/usuarios/cadastros'}
                        className={cn(
                          "h-10 text-base rounded-lg transition-all duration-200 group relative overflow-hidden",
                          location.pathname === '/admin/usuarios/cadastros' ? "bg-gradient-brand text-white" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <Link to="/admin/usuarios/cadastros" className="flex items-center w-full">
                          <UserPlus className="w-4 h-4 mr-2" /> Cadastros
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin/usuarios/tipos'}
                        className={cn(
                          "h-10 text-base rounded-lg transition-all duration-200 group relative overflow-hidden",
                          location.pathname === '/admin/usuarios/tipos' ? "bg-gradient-brand text-white" : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <Link to="/admin/usuarios/tipos" className="flex items-center w-full">
                          <UserCog className="w-4 h-4 mr-2" /> Tipos de Usuários
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                )}
              </SidebarMenuItem>
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
