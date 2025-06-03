
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
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Lead, CreateLeadData } from '@/types/database';
import { ImportConfig, ExportConfig } from '@/types/leads';
import { 
  mockLeadsDatabase, 
  mockEtapasJornada, 
  mockStatusLead, 
  mockOrigensLead,
  getEtapaJornadaById,
  getStatusLeadById,
  getOrigemLeadById
} from '@/data/mockDatabaseData';
import { ImportLeadsModal } from '@/components/leads/ImportLeadsModal';
import { ExportReportModal } from '@/components/leads/ExportReportModal';
import { EditLeadModal } from '@/components/leads/EditLeadModal';
import { DeleteLeadModal } from '@/components/leads/DeleteLeadModal';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'list' | 'kanban';

export default function LeadsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(mockLeadsDatabase);
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
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status_lead_id: newStatusId, updated_at: new Date().toISOString() }
        : lead
    ));
    
    toast({
      title: "Status atualizado",
      description: "O status do lead foi atualizado com sucesso.",
    });
  };

  const handleImport = (config: ImportConfig) => {
    toast({
      title: "Importação iniciada",
      description: `Processando arquivo ${config.fileName}...`,
    });
    console.log('Import config:', config);
  };

  const handleExport = (config: ExportConfig) => {
    toast({
      title: "Relatório gerado",
      description: "O download do relatório será iniciado em breve.",
    });
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
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    
    toast({
      title: "Lead atualizado",
      description: "As informações do lead foram atualizadas com sucesso.",
    });
  };

  const handleCreateLead = (leadData: CreateLeadData) => {
    const newLead: Lead = {
      id: Math.max(...leads.map(l => l.id)) + 1,
      ...leadData,
      empresa_id: 1, // Sempre empresa_id = 1
      ativo: true,
      deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_updated_at: null
    };

    setLeads(prev => [newLead, ...prev]);
    
    toast({
      title: "Lead criado",
      description: "Novo lead foi criado com sucesso.",
    });
  };

  const handleConfirmDelete = (leadId: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    
    toast({
      title: "Lead excluído",
      description: "O lead foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const getStatusBadgeColor = (statusId: number) => {
    const status = getStatusLeadById(statusId);
    return `bg-blue-100 text-blue-800 hover:bg-blue-100`;
  };

  const getEtapaBadgeColor = (etapaId?: number) => {
    if (!etapaId) return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    const etapa = getEtapaJornadaById(etapaId);
    return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
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
                  {mockStatusLead.map((status) => (
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
                  {mockEtapasJornada.map((etapa) => (
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
                const etapa = getEtapaJornadaById(lead.etapa_jornada_id || 0);
                const status = getStatusLeadById(lead.status_lead_id);
                const origem = getOrigemLeadById(lead.origem_lead_id);
                
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
                          {mockStatusLead.map((statusOption) => (
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
