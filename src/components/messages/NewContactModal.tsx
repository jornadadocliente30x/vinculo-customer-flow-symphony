
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreateLeadData } from '@/types/database';
import { 
  mockEtapasJornada, 
  mockStatusLead, 
  mockOrigensLead,
  mockLeadsDatabase 
} from '@/data/mockDatabaseData';

interface NewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveContact: (leadData: CreateLeadData) => void;
}

export function NewContactModal({ 
  isOpen, 
  onClose, 
  onSaveContact
}: NewContactModalProps) {
  const [nome, setNome] = useState('');
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [statusLeadId, setStatusLeadId] = useState<number>(1); // Default: Atendimento
  const [origemLeadId, setOrigemLeadId] = useState<number>(2); // Default: WhatsApp
  const [etapaJornadaId, setEtapaJornadaId] = useState<number | undefined>(1); // Default: Assimilação
  const [avatar, setAvatar] = useState<string>('');
  const [duplicateContact, setDuplicateContact] = useState<any>(null);

  const checkForDuplicates = (phoneValue: string, emailValue: string) => {
    const duplicate = mockLeadsDatabase.find(lead => 
      lead.telefone === phoneValue || 
      (emailValue && lead.email === emailValue)
    );
    
    setDuplicateContact(duplicate || null);
  };

  const handlePhoneChange = (value: string) => {
    setTelefone(value);
    checkForDuplicates(value, email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    checkForDuplicates(telefone, value);
  };

  const handleRequestTransfer = () => {
    console.log('Requesting transfer for duplicate contact:', duplicateContact);
    alert(`Solicitação de transferência enviada para o usuário responsável`);
    onClose();
  };

  const handleSubmit = () => {
    if (!nome || !telefone || duplicateContact) return;

    const leadData: CreateLeadData = {
      nome,
      primeiro_nome: primeiroNome || undefined,
      ultimo_nome: ultimoNome || undefined,
      telefone,
      email: email || undefined,
      endereco: endereco || undefined,
      cidade: cidade || undefined,
      estado: estado || undefined,
      cpf: cpf || undefined,
      data_nascimento: dataNascimento || undefined,
      observacoes: observacoes || undefined,
      status_lead_id: statusLeadId,
      origem_lead_id: origemLeadId,
      etapa_jornada_id: etapaJornadaId,
      usuario_responsavel_id: undefined
    };

    onSaveContact(leadData);

    // Reset form
    setNome('');
    setPrimeiroNome('');
    setUltimoNome('');
    setTelefone('');
    setEmail('');
    setEndereco('');
    setCidade('');
    setEstado('');
    setCpf('');
    setDataNascimento('');
    setObservacoes('');
    setStatusLeadId(1);
    setOrigemLeadId(2);
    setEtapaJornadaId(1);
    setAvatar('');
    setDuplicateContact(null);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Lead</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Alerta de contato duplicado */}
          {duplicateContact && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    Já existe um lead com este {duplicateContact.telefone === telefone ? 'telefone' : 'email'}.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRequestTransfer}
                    >
                      Solicitar Transferência
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDuplicateContact(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Avatar Upload */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-lg">
                {nome[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label>Foto do Lead</Label>
              <div className="mt-1">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Escolher Foto
                    </span>
                  </Button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo do lead"
              />
            </div>

            <div>
              <Label htmlFor="primeiro_nome">Primeiro Nome</Label>
              <Input
                id="primeiro_nome"
                value={primeiroNome}
                onChange={(e) => setPrimeiroNome(e.target.value)}
                placeholder="Primeiro nome"
              />
            </div>

            <div>
              <Label htmlFor="ultimo_nome">Último Nome</Label>
              <Input
                id="ultimo_nome"
                value={ultimoNome}
                onChange={(e) => setUltimoNome(e.target.value)}
                placeholder="Último nome"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={telefone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+55 11 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua, número, complemento"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Nome da cidade"
              />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                placeholder="UF"
                maxLength={2}
              />
            </div>
          </div>

          {/* Configurações do Lead */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status *</Label>
              <Select 
                value={statusLeadId.toString()} 
                onValueChange={(value) => setStatusLeadId(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
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
                value={origemLeadId.toString()} 
                onValueChange={(value) => setOrigemLeadId(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
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
          </div>

          <div>
            <Label>Etapa da Jornada</Label>
            <Select 
              value={etapaJornadaId?.toString() || ''} 
              onValueChange={(value) => setEtapaJornadaId(parseInt(value))}
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

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Informações adicionais sobre o lead"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!nome || !telefone || !!duplicateContact}
              className="bg-gradient-brand hover:opacity-90"
            >
              Salvar Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
