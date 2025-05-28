
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  Zap,
  MessageSquare,
  BarChart3,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
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
    title: 'Funil de Automação',
    href: '/dashboard/automations',
    icon: Zap
  },
  {
    title: 'Conversas',
    href: '/dashboard/messages',
    icon: MessageSquare
  },
  {
    title: 'Templates',
    href: '/dashboard/templates',
    icon: MessageSquare
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3
  },
  {
    title: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vinculo
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                    className="h-12 text-base"
                  >
                    <Link to={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
