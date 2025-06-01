import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';
import UsuariosCadastrosContent from './UsuariosCadastrosContent';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Globe,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    id: 'empresa',
    title: 'Dados da Empresa',
    icon: Building2,
  },
  {
    id: 'usuarios',
    title: 'Usuários',
    icon: Users,
  },
  {
    id: 'pagamentos',
    title: 'Pagamentos',
    icon: CreditCard,
  },
];

interface CompanyData {
  responsible: string;
  email: string;
  phone: string;
  fantasia: string;
  razaoSocial: string;
  cnpj: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  logo: string;
  emailRemetente: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
  website: string;
}

interface Payment {
  id: number;
  plan: string;
  value: string;
  signatureDate: string;
  dueDate: string;
  status: 'Pago' | 'Atrasado' | 'A Vencer';
}

const mockCompanyData: CompanyData = {
  responsible: 'Paulo Barreto',
  email: 'contato@dentis.com.br',
  phone: '(11) 99999-9999',
  fantasia: 'Dentis Tecnologia',
  razaoSocial: 'Dentis Tecnologia LTDA',
  cnpj: '12.345.678/0001-90',
  address: 'Rua das Flores, 123',
  neighborhood: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  cep: '01234-567',
  logo: '',
  emailRemetente: 'noreply@dentis.com.br',
  instagram: '@dentis_tech',
  linkedin: '/company/dentis-tech',
  tiktok: '@dentis_tech',
  youtube: '/c/dentis-tech',
  website: 'https://dentis.com.br'
};

const mockPayments: Payment[] = [
  {
    id: 1,
    plan: 'Pro Plus',
    value: 'R$ 299,90',
    signatureDate: '15/01/2025',
    dueDate: '15/06/2025',
    status: 'Pago'
  },
  {
    id: 2,
    plan: 'Pro Plus',
    value: 'R$ 299,90',
    signatureDate: '15/01/2025',
    dueDate: '15/05/2025',
    status: 'A Vencer'
  },
  {
    id: 3,
    plan: 'Pro Plus',
    value: 'R$ 299,90',
    signatureDate: '15/01/2025',
    dueDate: '15/04/2025',
    status: 'Atrasado'
  }
];

export default function UsuariosCadastrosPage() {
  const [activeSection, setActiveSection] = useState('empresa');
  const [companyData, setCompanyData] = useState<CompanyData>(mockCompanyData);
  const [payments] = useState<Payment[]>(mockPayments);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveCompany = () => {
    setIsEditing(false);
    toast({
      title: "Dados salvos",
      description: "Os dados da empresa foram atualizados com sucesso.",
    });
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Pago':
        return 'bg-green-100 text-green-800';
      case 'Atrasado':
        return 'bg-red-100 text-red-800';
      case 'A Vencer':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'Pago':
        return <CheckCircle className="w-4 h-4" />;
      case 'Atrasado':
        return <AlertCircle className="w-4 h-4" />;
      case 'A Vencer':
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'empresa':
        return (
          <Card className="shadow-soft border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center justify-between text-xl text-gray-800">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Dados da Empresa
                </div>
                <Button
                  onClick={() => isEditing ? handleSaveCompany() : setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  {isEditing ? 'Salvar' : 'Editar'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Informações Básicas
                  </h3>
                  
                  <div>
                    <Label htmlFor="responsible">Responsável</Label>
                    <Input
                      id="responsible"
                      value={companyData.responsible}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, responsible: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="fantasia">Nome Fantasia</Label>
                    <Input
                      id="fantasia"
                      value={companyData.fantasia}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, fantasia: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="razaoSocial">Razão Social</Label>
                    <Input
                      id="razaoSocial"
                      value={companyData.razaoSocial}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, razaoSocial: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={companyData.cnpj}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, cnpj: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Endereço e Configurações */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Endereço
                  </h3>

                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={companyData.address}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        value={companyData.neighborhood}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, neighborhood: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={companyData.city}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={companyData.state}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, state: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={companyData.cep}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, cep: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Logomarca</Label>
                    <FileUpload
                      value={companyData.logo}
                      onChange={(file, url) => {
                        setCompanyData(prev => ({ ...prev, logo: url || '' }));
                      }}
                      placeholder="Selecionar logomarca..."
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailRemetente">E-mail Remetente</Label>
                    <Input
                      id="emailRemetente"
                      type="email"
                      value={companyData.emailRemetente}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, emailRemetente: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <Input
                      placeholder="Instagram"
                      value={companyData.instagram}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, instagram: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <Input
                      placeholder="LinkedIn"
                      value={companyData.linkedin}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, linkedin: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <Input
                      placeholder="YouTube"
                      value={companyData.youtube}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, youtube: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <Input
                      placeholder="Website"
                      value={companyData.website}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'usuarios':
        return <UsuariosCadastrosContent />;

      case 'pagamentos':
        return (
          <Card className="shadow-soft border-gray-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl text-gray-800">
                <CreditCard className="w-5 h-5 mr-2" />
                Lista de Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={cn("text-xs", getStatusColor(payment.status))}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{payment.plan}</h4>
                        <p className="text-sm text-gray-600">Assinatura: {payment.signatureDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-gray-900">{payment.value}</p>
                      <p className="text-sm text-gray-600">Vence: {payment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <AdminProtectedRoute>
      <DashboardLayout>
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar className="w-64 border-r border-gray-200">
              <SidebarHeader className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Configurações
                </h2>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="p-4">
                      {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            isActive={activeSection === item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg transition-all duration-200",
                              activeSection === item.id
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "hover:bg-gray-100 text-gray-700"
                            )}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            
            <SidebarInset className="flex-1">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <SidebarTrigger className="mr-4" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {sidebarItems.find(item => item.id === activeSection)?.title}
                  </h1>
                </div>
                {renderContent()}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </DashboardLayout>
    </AdminProtectedRoute>
  );
}
