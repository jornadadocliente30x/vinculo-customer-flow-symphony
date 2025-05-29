
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Plus, X, AlertTriangle } from 'lucide-react';
import { Contact, ContactService, TransferRequest } from '@/types/messages';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveContact: (contact: Omit<Contact, 'id'>) => void;
  existingContacts?: Contact[];
}

const serviceTypes = [
  { value: 'consultation', label: 'Consulta Médica' },
  { value: 'exam', label: 'Exames' },
  { value: 'surgery', label: 'Cirurgia' },
  { value: 'therapy', label: 'Fisioterapia' },
  { value: 'nutrition', label: 'Nutrição' },
  { value: 'psychology', label: 'Psicologia' },
  { value: 'custom', label: 'Personalizado' },
];

export function NewContactModal({ 
  isOpen, 
  onClose, 
  onSaveContact, 
  existingContacts = [] 
}: NewContactModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState<ContactService[]>([]);
  const [avatar, setAvatar] = useState<string>('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceType, setNewServiceType] = useState<ContactService['type']>('consultation');
  const [duplicateContact, setDuplicateContact] = useState<Contact | null>(null);
  const [showTransferRequest, setShowTransferRequest] = useState(false);

  const checkForDuplicates = (phoneValue: string, emailValue: string) => {
    const duplicate = existingContacts.find(contact => 
      contact.phone === phoneValue || 
      (emailValue && contact.email === emailValue)
    );
    
    setDuplicateContact(duplicate || null);
    setShowTransferRequest(!!duplicate);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    checkForDuplicates(value, email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    checkForDuplicates(phone, value);
  };

  const handleAddService = () => {
    if (!newServiceName.trim()) return;

    const newService: ContactService = {
      id: Date.now().toString(),
      name: newServiceName,
      type: newServiceType,
    };

    setServices(prev => [...prev, newService]);
    setNewServiceName('');
    setNewServiceType('consultation');
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const handleRequestTransfer = () => {
    // Aqui você implementaria a lógica de solicitação de transferência
    console.log('Requesting transfer for duplicate contact:', duplicateContact);
    // Simular notificação para o usuário responsável
    alert(`Solicitação de transferência enviada para ${duplicateContact?.assignedUser || 'usuário responsável'}`);
    onClose();
  };

  const handleSubmit = () => {
    if (!firstName || !phone || duplicateContact) return;

    onSaveContact({
      firstName,
      lastName,
      phone,
      email,
      description,
      services,
      avatar,
    });

    // Reset form
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setDescription('');
    setServices([]);
    setAvatar('');
    setDuplicateContact(null);
    setShowTransferRequest(false);
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
          <DialogTitle>Novo Contato</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Alerta de contato duplicado */}
          {duplicateContact && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    Já existe um contato com este {duplicateContact.phone === phone ? 'telefone' : 'email'} 
                    sendo atendido por <strong>{duplicateContact.assignedUser || 'outro usuário'}</strong>.
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
                        setShowTransferRequest(false);
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
                {firstName[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label>Foto do Contato</Label>
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

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nome"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sobrenome"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={phone}
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

          {/* Description */}
          <div>
            <Label htmlFor="description">Breve Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Informações adicionais sobre o contato"
              rows={3}
            />
          </div>

          {/* Services */}
          <div>
            <Label>Serviços Associados</Label>
            
            {/* Add new service */}
            <div className="mt-2 space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nome do serviço"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="flex-1"
                />
                <Select value={newServiceType} onValueChange={(value) => setNewServiceType(value as ContactService['type'])}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAddService}
                  disabled={!newServiceName.trim()}
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Services list */}
              {services.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Serviços Selecionados:</Label>
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{service.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({serviceTypes.find(t => t.value === service.type)?.label})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!firstName || !phone || !!duplicateContact}
              className="bg-gradient-brand hover:opacity-90"
            >
              Salvar Contato
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
