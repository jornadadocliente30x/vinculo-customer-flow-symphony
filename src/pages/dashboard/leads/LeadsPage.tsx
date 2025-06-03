
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Upload, 
  FileSpreadsheet, 
  Search, 
  Edit, 
  Trash2, 
  List,
  Kanban,
  Filter,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '@/hooks/useLeads';
import { ImportLeadsModal } from '@/components/leads/ImportLeadsModal';
import { ExportReportModal } from '@/components/leads/ExportReportModal';
import { EditLeadModal } from '@/components/leads/EditLeadModal';
import { DeleteLeadModal } from '@/components/leads/DeleteLeadModal';
import type { Lead } from '@/types/database';
import type { ImportConfig, ExportConfig } from '@/types/leads';

type ViewMode = 'list' | 'kanban';

export default function LeadsPage() {
  const navigate = useNavigate();
  const {
    leads,
    etapas,
    statusOptions,
    origens,
    isLoading,
    createLead,
    updateLead,
    deleteLead,
  } = useLeads();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEtapa, setFilterEtapa] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Modal states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.telefone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || lead.status_lead_id.toString() === filterStatus;
    const matchesEtapa = filterEtapa === 'all' || lead.etapa_jornada_id?.toString() === filterEtapa;
    
    return matchesSearch && matchesStatus && matchesEtapa;
  });

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage);

  const handleStatusChange = (leadId: number, newStatusId: number) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      updateLead({
        ...lead,
        status_lead_id: newStatusId,
      });
    }
  };

  const handleImport = (config: ImportConfig) => {
    console.log('Import config:', config);
  };

  const handleExport = (config: ExportConfig) => {
    console.log('Export config:', config);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    updateLead(updatedLead);
  };

  const handleConfirmDelete = (leadId: number) => {
    deleteLead(leadId);
  };

  const getStatusBadgeColor = (statusId: number) => {
    const status = statusOptions.find(s => s.id === statusId);
    return status?.cor ? `bg-[${status.cor}] text-white` : 'bg-blue-100 text-blue-800';
  };

  const getEtapaBadgeColor = (etapaId?: number) => {
    if (!etapaId) return 'bg-gray-100 text-gray-800';
    const etapa = etapas.find(e => e.id === etapaId);
    return etapa?.cor ? `bg-[${etapa.cor}] text-white` : 'bg-purple-100 text-purple-800';
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'kanban') {
      navigate('/dashboard/leads/funnel');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando leads...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Leads
            </h1>
            <p className="text-gray-600">
              Gerencie todos os seus leads e contatos
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="rounded-r-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('kanban')}
                className="rounded-l-none"
              >
                <Kanban className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-4">
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterEtapa} onValueChange={setFilterEtapa}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as etapas</SelectItem>
                  {etapas.map((etapa) => (
                    <SelectItem key={etapa.id} value={etapa.id.toString()}>
                      {etapa.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-soft">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => {
                const etapa = etapas.find(e => e.id === lead.etapa_jornada_id);
                const status = statusOptions.find(s => s.id === lead.status_lead_id);
                const origem = origens.find(o => o.id === lead.origem_lead_id);
                
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">
                      {lead.nome}
                    </TableCell>
                    <TableCell>{lead.telefone}</TableCell>
                    <TableCell>{lead.email || '-'}</TableCell>
                    <TableCell>
                      {etapa && (
                        <Badge className={getEtapaBadgeColor(lead.etapa_jornada_id)}>
                          {etapa.nome}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={lead.status_lead_id.toString()}
                        onValueChange={(value) => handleStatusChange(lead.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-auto">
                          <Badge className={getStatusBadgeColor(lead.status_lead_id)}>
                            {status?.nome}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((statusOption) => (
                            <SelectItem key={statusOption.id} value={statusOption.id.toString()}>
                              {statusOption.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{origem?.nome}</TableCell>
                    <TableCell>
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLead(lead)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLead(lead)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum lead encontrado com os filtros selecionados.
            </div>
          )}
        </div>

        {/* Paginação visual moderna */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow-sm bg-white border border-gray-200">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-0 transition-colors duration-150
                    ${currentPage === idx + 1
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  style={{ minWidth: 40 }}
                >
                  {idx + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Modals */}
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        lead={selectedLead}
        onSave={handleSaveLead}
      />

      <DeleteLeadModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        lead={selectedLead}
        onDelete={handleConfirmDelete}
      />
    </DashboardLayout>
  );
}
