
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users,
  Bot,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Target,
  FileText,
  Calendar,
  Clock,
  Mail,
  Book
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SupportCard } from '@/components/dashboard/SupportCard';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
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
    submenu: [
      { title: 'Gestão', href: '/dashboard/leads/manage', icon: Users },
      { title: 'Importar', href: '/dashboard/leads/import', icon: UserPlus },
      { title: 'Funil', href: '/dashboard/leads/funnel', icon: Target },
      { title: 'Relatórios', href: '/dashboard/leads/reports', icon: FileText }
    ]
  },
  {
    title: 'Automação',
    href: '/dashboard/automations/agents',
    icon: Bot
  },
  {
    title: 'Conversas',
    href: '/dashboard/messages',
    icon: MessageSquare,
    submenu: [
      { title: 'WhatsApp', href: '/dashboard/messages/whatsapp', icon: MessageSquare },
      { title: 'Atendimento', href: '/dashboard/messages/support', icon: Clock },
      { title: 'Histórico', href: '/dashboard/messages/history', icon: FileText },
      { title: 'Templates', href: '/dashboard/messages/templates', icon: Book }
    ]
  },
  {
    title: 'Templates',
    href: '/dashboard/templates',
    icon: MessageSquare,
    submenu: [
      { title: 'Mensagens', href: '/dashboard/templates/messages', icon: MessageSquare },
      { title: 'E-mail', href: '/dashboard/templates/email', icon: Mail },
      { title: 'Sequências', href: '/dashboard/templates/sequences', icon: Bot },
      { title: 'Biblioteca', href: '/dashboard/templates/library', icon: Book }
    ]
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (item: MenuItem) => {
    if (isActive(item.href)) return true;
    return item.submenu?.some(sub => isActive(sub.href)) || false;
  };

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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <div className="space-y-1">
                    <SidebarMenuButton 
                      asChild={!item.submenu}
                      isActive={isParentActive(item)}
                      className={cn(
                        "h-12 text-base rounded-xl transition-all duration-200 group relative overflow-hidden",
                        isParentActive(item) 
                          ? "bg-gradient-brand text-white shadow-brand hover:shadow-lg" 
                          : "hover:bg-white hover:shadow-soft text-gray-700 hover:text-gray-900"
                      )}
                      onClick={item.submenu ? () => toggleExpanded(item.title) : undefined}
                    >
                      {item.submenu ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <item.icon className={cn(
                              "w-5 h-5 mr-3",
                              isParentActive(item) ? "text-white" : ""
                            )} />
                            <span className={cn(
                              "font-medium",
                              isParentActive(item) ? "text-white" : ""
                            )}>{item.title}</span>
                          </div>
                          {expandedItems.includes(item.title) ? (
                            <ChevronDown className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isParentActive(item) ? "text-white" : ""
                            )} />
                          ) : (
                            <ChevronRight className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isParentActive(item) ? "text-white" : ""
                            )} />
                          )}
                        </div>
                      ) : (
                        <Link to={item.href} className="flex items-center w-full">
                          <item.icon className={cn(
                            "w-5 h-5 mr-3",
                            isParentActive(item) ? "text-white" : ""
                          )} />
                          <span className={cn(
                            "font-medium",
                            isParentActive(item) ? "text-white" : ""
                          )}>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>

                    {item.submenu && expandedItems.includes(item.title) && (
                      <div className="ml-4 mt-2 space-y-1 animate-fade-in">
                        {item.submenu.map((subItem) => (
                          <SidebarMenuButton
                            key={subItem.href}
                            asChild
                            isActive={isActive(subItem.href)}
                            className={cn(
                              "h-10 text-sm rounded-lg transition-all duration-200",
                              isActive(subItem.href)
                                ? "bg-gradient-to-r from-brand-100 to-purple-100 text-brand-700 border-l-2 border-brand-500"
                                : "hover:bg-white hover:shadow-soft text-gray-600 hover:text-gray-800"
                            )}
                          >
                            <Link to={subItem.href} className="flex items-center">
                              <subItem.icon className={cn(
                                "w-4 h-4 mr-3",
                                isActive(subItem.href) ? "text-brand-700" : ""
                              )} />
                              <span className={cn(
                                isActive(subItem.href) ? "text-brand-700 font-medium" : ""
                              )}>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
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
