
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { CreateLeadData } from '@/types/database';
import { leadsService } from '@/services/leadsService';
import { useToast } from '@/hooks/use-toast';

interface NewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: CreateLeadData) => void;
}

export function NewContactModal({ isOpen, onClose, onSave }: NewContactModalProps) {
  const [statusChatOptions, setStatusChatOptions] = useState<any[]>([]);
  const [origens, setOrigens] = useState<any[]>([]);
  const [etapas, setEtapas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<CreateLeadData>>({
    nome: '',
    primeiro_nome: '',
    ultimo_nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    cpf: '',
    data_nascimento: '',
    observacoes: '',
    status_lead_id: undefined,
    origem_lead_id: undefined,
    etapa_jornada_id: undefined,
  });

  // Carregar dados quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statusChatData, origensData, etapasData] = await Promise.all([
        leadsService.getStatusChat(),
        leadsService.getOrigensLead(),
        leadsService.getEtapasJornada()
      ]);

      setStatusChatOptions(statusChatData);
      setOrigens(origensData);
      setEtapas(etapasData);

      // Set default values
      setFormData(prev => ({
        ...prev,
        status_lead_id: prev.status_lead_id || statusChatData[0]?.id,
        origem_lead_id: prev.origem_lead_id || origensData.find(o => o.nome.toLowerCase().includes('whatsapp'))?.id || origensData[0]?.id,
        etapa_jornada_id: prev.etapa_jornada_id || etapasData[0]?.id,
      }));

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as opções do formulário.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.telefone || !formData.status_lead_id || !formData.origem_lead_id) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha os campos obrigatórios: Nome, Telefone, Status e Origem.",
        variant: "destructive",
      });
      return;
    }

    const leadData: CreateLeadData = {
      nome: formData.nome,
      primeiro_nome: formData.primeiro_nome,
      ultimo_nome: formData.ultimo_nome,
      telefone: formData.telefone,
      email: formData.email,
      endereco: formData.endereco,
      cidade: formData.cidade,
      estado: formData.estado,
      cpf: formData.cpf,
      data_nascimento: formData.data_nascimento,
      observacoes: formData.observacoes,
      status_lead_id: formData.status_lead_id,
      origem_lead_id: formData.origem_lead_id,
      etapa_jornada_id: formData.etapa_jornada_id,
      usuario_responsavel_id: formData.usuario_responsavel_id,
    };

    onSave(leadData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      primeiro_nome: '',
      ultimo_nome: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      data_nascimento: '',
      observacoes: '',
      status_lead_id: statusChatOptions[0]?.id,
      origem_lead_id: origens.find(o => o.nome.toLowerCase().includes('whatsapp'))?.id || origens[0]?.id,
      etapa_jornada_id: etapas[0]?.id,
    });
    onClose();
  };

  const handleChange = (field: keyof CreateLeadData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Carregando dados...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-left">
            <UserPlus className="w-5 h-5 mr-2" />
            Novo Contato
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 space-y-0">
          <div className="col-span-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome || ''}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Nome completo do contato"
            />
          </div>

          <div>
            <Label htmlFor="primeiro_nome">Primeiro Nome</Label>
            <Input
              id="primeiro_nome"
              value={formData.primeiro_nome || ''}
              onChange={(e) => handleChange('primeiro_nome', e.target.value)}
              placeholder="Primeiro nome"
            />
          </div>

          <div>
            <Label htmlFor="ultimo_nome">Último Nome</Label>
            <Input
              id="ultimo_nome"
              value={formData.ultimo_nome || ''}
              onChange={(e) => handleChange('ultimo_nome', e.target.value)}
              placeholder="Último nome"
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone || ''}
              onChange={(e) => handleChange('telefone', e.target.value)}
              placeholder="+55 11 99999-9999"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="data_nascimento">Data de Nascimento</Label>
            <Input
              id="data_nascimento"
              type="date"
              value={formData.data_nascimento || ''}
              onChange={(e) => handleChange('data_nascimento', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={formData.cpf || ''}
              onChange={(e) => handleChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco || ''}
              onChange={(e) => handleChange('endereco', e.target.value)}
              placeholder="Rua, número, complemento"
            />
          </div>

          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={formData.cidade || ''}
              onChange={(e) => handleChange('cidade', e.target.value)}
              placeholder="Nome da cidade"
            />
          </div>

          <div>
            <Label htmlFor="estado">Estado</Label>
            <Input
              id="estado"
              value={formData.estado || ''}
              onChange={(e) => handleChange('estado', e.target.value)}
              placeholder="UF"
              maxLength={2}
            />
          </div>

          <div>
            <Label>Etapa da Jornada</Label>
            <Select 
              value={formData.etapa_jornada_id?.toString() || ''} 
              onValueChange={(value) => handleChange('etapa_jornada_id', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma etapa" />
              </SelectTrigger>
              <SelectContent>
                {etapas.map((etapa) => (
                  <SelectItem key={etapa.id} value={etapa.id.toString()}>
                    {etapa.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status *</Label>
            <Select 
              value={formData.status_lead_id?.toString() || ''} 
              onValueChange={(value) => handleChange('status_lead_id', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {statusChatOptions.map((status) => (
                  <SelectItem key={status.id} value={status.id.toString()}>
                    {status.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Origem *</Label>
            <Select 
              value={formData.origem_lead_id?.toString() || ''} 
              onValueChange={(value) => handleChange('origem_lead_id', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma origem" />
              </SelectTrigger>
              <SelectContent>
                {origens.map((origem) => (
                  <SelectItem key={origem.id} value={origem.id.toString()}>
                    {origem.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes || ''}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              rows={3}
              placeholder="Observações sobre o contato"
            />
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Salvar Contato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
