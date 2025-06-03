
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { Lead, UpdateLeadData } from '@/types/database';
import { 
  mockEtapasJornada, 
  mockStatusLead, 
  mockOrigensLead 
} from '@/data/mockDatabaseData';

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSave: (lead: Lead) => void;
}

export function EditLeadModal({ isOpen, onClose, lead, onSave }: EditLeadModalProps) {
  const [formData, setFormData] = useState<Partial<UpdateLeadData>>({});

  useEffect(() => {
    if (lead) {
      setFormData({
        id: lead.id,
        nome: lead.nome,
        primeiro_nome: lead.primeiro_nome || '',
        ultimo_nome: lead.ultimo_nome || '',
        telefone: lead.telefone,
        email: lead.email || '',
        endereco: lead.endereco || '',
        cidade: lead.cidade || '',
        estado: lead.estado || '',
        cpf: lead.cpf || '',
        data_nascimento: lead.data_nascimento || '',
        observacoes: lead.observacoes || '',
        status_lead_id: lead.status_lead_id,
        origem_lead_id: lead.origem_lead_id,
        etapa_jornada_id: lead.etapa_jornada_id || undefined,
        usuario_responsavel_id: lead.usuario_responsavel_id || undefined
      });
    }
  }, [lead]);

  const handleSubmit = () => {
    if (!lead || !formData.nome || !formData.telefone) {
      return;
    }

    const updatedLead: Lead = {
      ...lead,
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
      status_lead_id: formData.status_lead_id || lead.status_lead_id,
      origem_lead_id: formData.origem_lead_id || lead.origem_lead_id,
      etapa_jornada_id: formData.etapa_jornada_id || lead.etapa_jornada_id,
      usuario_responsavel_id: formData.usuario_responsavel_id || lead.usuario_responsavel_id,
      updated_at: new Date().toISOString(),
    };

    onSave(updatedLead);
    onClose();
  };

  const handleChange = (field: keyof UpdateLeadData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="w-5 h-5 mr-2" />
            Editar Lead
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 space-y-0">
          <div className="col-span-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              value={formData.nome || ''}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Nome completo do lead"
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
                {mockEtapasJornada.map((etapa) => (
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
                {mockStatusLead.map((status) => (
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
                {mockOrigensLead.map((origem) => (
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
              placeholder="Observações sobre o lead"
            />
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
