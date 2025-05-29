
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
import { LeadContact, ChatStatus, ImportConfig, ExportConfig } from '@/types/leads';
import { mockLeadsData, stageLabels, statusLabels, originLabels, tagLabels } from '@/data/mockLeadsData';
import { ImportLeadsModal } from '@/components/leads/ImportLeadsModal';
import { ExportReportModal } from '@/components/leads/ExportReportModal';
import { EditLeadModal } from '@/components/leads/EditLeadModal';
import { DeleteLeadModal } from '@/components/leads/DeleteLeadModal';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'list' | 'kanban';

export default function LeadsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<LeadContact[]>(mockLeadsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Modal states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadContact | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    
    return matchesSearch && matchesStatus && matchesStage;
  });

  const handleStatusChange = (leadId: string, newStatus: ChatStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, updatedAt: new Date() }
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

  const handleEditLead = (lead: LeadContact) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDeleteLead = (lead: LeadContact) => {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  };

  const handleSaveLead = (updatedLead: LeadContact) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    
    toast({
      title: "Lead atualizado",
      description: "As informações do lead foram atualizadas com sucesso.",
    });
  };

  const handleConfirmDelete = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    
    toast({
      title: "Lead excluído",
      description: "O lead foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const getStatusBadgeColor = (status: ChatStatus) => {
    const colors = {
      atendimento: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      finalizados: 'bg-green-100 text-green-800 hover:bg-green-100',
      agendamentos: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      conversa_ia: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    };
    return colors[status];
  };

  const getStageBadgeColor = (stage: string) => {
    const colors = {
      assimilacao: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
      utilizacao: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      adoracao: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      expansao: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      evangelismo: 'bg-green-100 text-green-800 hover:bg-green-100',
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  };

  if (viewMode === 'kanban') {
    navigate('/dashboard/leads/funnel');
    return null;
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
                onClick={() => setViewMode('list')}
                className="rounded-r-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('kanban')}
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
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as etapas</SelectItem>
                  {Object.entries(stageLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
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
                <TableHead>Data Conversão</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge className={getStageBadgeColor(lead.stage)}>
                      {stageLabels[lead.stage]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value: ChatStatus) => handleStatusChange(lead.id, value)}
                    >
                      <SelectTrigger className="w-auto">
                        <Badge className={getStatusBadgeColor(lead.status)}>
                          {statusLabels[lead.status]}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{originLabels[lead.origin]}</TableCell>
                  <TableCell>
                    {lead.conversionDate.toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        lead.tag === 'cliente' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      }
                    >
                      {tagLabels[lead.tag]}
                    </Badge>
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
              ))}
            </TableBody>
          </Table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum lead encontrado com os filtros selecionados.
            </div>
          )}
        </div>
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
