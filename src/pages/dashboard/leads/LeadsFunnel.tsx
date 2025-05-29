
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KanbanBoard } from '@/components/leads/KanbanBoard';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Search, Filter, Users, List, Kanban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeadsFunnel() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResponsible, setFilterResponsible] = useState('all');
  const [filterValue, setFilterValue] = useState('all');

  const handleViewModeChange = (mode: 'list' | 'kanban') => {
    if (mode === 'list') {
      navigate('/dashboard/leads');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Funil de Vendas
            </h1>
            <p className="text-gray-600">
              Gerencie seus leads através do funil de vendas com drag & drop
            </p>
          </div>
          
          <div className="flex border rounded-lg mt-4 lg:mt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewModeChange('list')}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleViewModeChange('kanban')}
              className="rounded-l-none"
            >
              <Kanban className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterResponsible} onValueChange={setFilterResponsible}>
                <SelectTrigger className="w-full sm:w-48">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os responsáveis</SelectItem>
                  <SelectItem value="joao">João Santos</SelectItem>
                  <SelectItem value="ana">Ana Costa</SelectItem>
                  <SelectItem value="pedro">Pedro Alves</SelectItem>
                  <SelectItem value="lucia">Lucia Mendes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Valor do negócio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os valores</SelectItem>
                  <SelectItem value="low">Até R$ 10.000</SelectItem>
                  <SelectItem value="medium">R$ 10.000 - R$ 25.000</SelectItem>
                  <SelectItem value="high">Acima de R$ 25.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-soft">
          <KanbanBoard 
            searchTerm={searchTerm}
            filterResponsible={filterResponsible}
            filterValue={filterValue}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
