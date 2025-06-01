import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  Building2, 
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  Globe,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

// Mock data para empresas assinantes
const mockCompanies = [
  {
    name: 'Clínica Odonto Premium',
    responsible: 'Dr. João Silva',
    email: 'joao@odontopremium.com',
    phone: '(11) 99999-9999',
    status: 'Ativa',
    plan: 'Premium',
    subscriptionDate: '15/01/2024',
    lastPayment: 'R$ 299,00 - 15/05/2025'
  },
  {
    name: 'Estética Bella Vita',
    responsible: 'Dra. Maria Santos',
    email: 'maria@bellavita.com',
    phone: '(11) 88888-8888',
    status: 'Ativa',
    plan: 'Pro',
    subscriptionDate: '02/03/2024',
    lastPayment: 'R$ 199,00 - 02/05/2025'
  },
  {
    name: 'Consultório Dr. Pedro',
    responsible: 'Dr. Pedro Costa',
    email: 'pedro@consultorio.com',
    phone: '(11) 77777-7777',
    status: 'Pendente',
    plan: 'Basic',
    subscriptionDate: '10/04/2024',
    lastPayment: 'R$ 99,00 - Pendente'
  },
  {
    name: 'Centro Médico Saúde+',
    responsible: 'Dra. Ana Oliveira',
    email: 'ana@saudemais.com',
    phone: '(11) 66666-6666',
    status: 'Ativa',
    plan: 'Enterprise',
    subscriptionDate: '20/12/2023',
    lastPayment: 'R$ 599,00 - 20/05/2025'
  },
  {
    name: 'Fisioterapia Movimento',
    responsible: 'Dr. Carlos Lima',
    email: 'carlos@movimento.com',
    phone: '(11) 55555-5555',
    status: 'Cancelada',
    plan: 'Pro',
    subscriptionDate: '05/02/2024',
    lastPayment: 'R$ 199,00 - 05/04/2025'
  }
];

// Mock data para empresas online
const onlineCompanies = [
  { name: 'Clínica Odonto Premium', users: 8, lastActivity: '2 min' },
  { name: 'Estética Bella Vita', users: 3, lastActivity: '15 min' },
  { name: 'Centro Médico Saúde+', users: 12, lastActivity: '1 min' },
  { name: 'Consultório Dr. Marcos', users: 2, lastActivity: '30 min' }
];

// Mock data para gráficos de vendas
const salesData = [
  { month: 'Jan', vendas: 15, receita: 28500 },
  { month: 'Fev', vendas: 22, receita: 41800 },
  { month: 'Mar', vendas: 18, receita: 34200 },
  { month: 'Abr', vendas: 28, receita: 52600 },
  { month: 'Mai', vendas: 32, receita: 60800 }
];

// Data for revenue goal chart (starts from 0 to goal)
const getRevenueGoalData = (currentRevenue: number, goal: number) => [
  { day: '1', receita: 0 },
  { day: '5', receita: Math.round(goal * 0.1) },
  { day: '10', receita: Math.round(goal * 0.25) },
  { day: '15', receita: Math.round(goal * 0.45) },
  { day: '20', receita: Math.round(goal * 0.65) },
  { day: '25', receita: Math.round(goal * 0.85) },
  { day: '30', receita: currentRevenue > goal ? goal : currentRevenue }
];

export default function AdminDashboard() {
  const [revenueGoal, setRevenueGoal] = useState(150000);
  const currentRevenue = 127500;
  const goalProgress = (currentRevenue / revenueGoal) * 100;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPlan, setFilterPlan] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportOptions, setReportOptions] = useState({
    empresas: true,
    receita: true,
    vendas: true,
    metas: false,
    empresasOnline: false
  });
  
  const itemsPerPage = 3;
  
  // Get dynamic revenue data based on current goal
  const monthlyRevenue = getRevenueGoalData(currentRevenue, revenueGoal);
  
  // Filtrar empresas
  const filteredCompanies = mockCompanies.filter(company => {
    const statusMatch = filterStatus === 'todos' || company.status.toLowerCase() === filterStatus.toLowerCase();
    const planMatch = filterPlan === 'todos' || company.plan.toLowerCase() === filterPlan.toLowerCase();
    return statusMatch && planMatch;
  });
  
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownloadReport = () => {
    // Simular download do relatório Excel
    console.log('Baixando relatório com opções:', reportOptions);
    // Aqui seria implementada a lógica real de exportação para Excel
    alert('Relatório sendo preparado para download...');
    setShowReportModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Visão geral do negócio e gestão de clientes Dentis
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={() => setShowReportModal(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Relatório Completo
          </Button>
        </div>
      </div>

      {/* Panel de Filtros Expandido */}
      {showFilters && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Filtros Avançados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plano</label>
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Planos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Planos</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setFilterStatus('todos');
                  setFilterPlan('todos');
                }}
                variant="outline"
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Card 1: Lista de Empresas Assinantes */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            Empresas Assinantes
          </h2>
          <div className="flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Empresa</th>
                <th className="text-left p-4 font-semibold text-gray-700">Responsável</th>
                <th className="text-left p-4 font-semibold text-gray-700">Contato</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Plano</th>
                <th className="text-left p-4 font-semibold text-gray-700">Data Assinatura</th>
                <th className="text-left p-4 font-semibold text-gray-700">Último Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((company, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{company.name}</td>
                  <td className="p-4">{company.responsible}</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {company.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {company.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge 
                      className={
                        company.status === 'Ativa' ? 'bg-green-100 text-green-700 hover:bg-green-200 transition-colors' :
                        company.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors' :
                        'bg-red-100 text-red-700 hover:bg-red-200 transition-colors'
                      }
                    >
                      {company.status === 'Ativa' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {company.status === 'Pendente' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {company.status === 'Cancelada' && <XCircle className="w-3 h-3 mr-1" />}
                      {company.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{company.plan}</Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{company.subscriptionDate}</td>
                  <td className="p-4 text-sm">{company.lastPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow-sm bg-white border border-gray-200">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-0 transition-colors duration-150
                    ${currentPage === idx + 1
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  style={{ minWidth: 40 }}
                >
                  {idx + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </Card>

      {/* Card 2: Gráficos de Vendas e Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Vendas por Mês
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="vendas" fill="url(#gradient)" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Receita Mensal - Meta: R$ {revenueGoal.toLocaleString()}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyRevenue}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, revenueGoal]} />
              <Tooltip formatter={(value) => [`R$ ${value?.toLocaleString()}`, 'Receita']} />
              <Line type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cards de Receita */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Receita Atual</p>
              <p className="text-2xl font-bold text-green-700">R$ 127.500</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Receita Anual</p>
              <p className="text-2xl font-bold text-blue-700">R$ 1.280.000</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Clientes Ativos</p>
              <p className="text-2xl font-bold text-purple-700">127</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Empresas Online */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-600" />
          Empresas Online Agora
        </h3>
        <div className="space-y-3">
          {onlineCompanies.map((company, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{company.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{company.users} usuários</span>
                <span>há {company.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Card 3: Meta de Receita */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-orange-600" />
          Meta de Receita
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Definir Meta Mensal
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={revenueGoal}
                onChange={(e) => setRevenueGoal(Number(e.target.value))}
                className="flex-1"
                placeholder="Ex: 150000"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                Atualizar
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso da Meta</span>
              <span className="text-sm font-semibold text-gray-900">{goalProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(goalProgress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>R$ {currentRevenue.toLocaleString()}</span>
              <span>R$ {revenueGoal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal de Relatório */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Relatório Completo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Selecione as informações que deseja incluir no relatório:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="empresas" 
                  checked={reportOptions.empresas}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, empresas: !!checked }))
                  }
                />
                <label htmlFor="empresas" className="text-sm font-medium">
                  Lista de Empresas Assinantes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="receita" 
                  checked={reportOptions.receita}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, receita: !!checked }))
                  }
                />
                <label htmlFor="receita" className="text-sm font-medium">
                  Dados de Receita
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vendas" 
                  checked={reportOptions.vendas}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, vendas: !!checked }))
                  }
                />
                <label htmlFor="vendas" className="text-sm font-medium">
                  Dados de Vendas
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metas" 
                  checked={reportOptions.metas}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, metas: !!checked }))
                  }
                />
                <label htmlFor="metas" className="text-sm font-medium">
                  Metas e Progresso
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="empresasOnline" 
                  checked={reportOptions.empresasOnline}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, empresasOnline: !!checked }))
                  }
                />
                <label htmlFor="empresasOnline" className="text-sm font-medium">
                  Status Online das Empresas
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportModal(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDownloadReport}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Excel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
