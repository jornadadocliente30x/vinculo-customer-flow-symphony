
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentType } from '@/types/agents';
import { FileUploadSection } from './FileUploadSection';

interface AgentFormDataProps {
  title: string;
  description: string;
  type: AgentType;
  files: File[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: AgentType) => void;
  onFileUpload: (files: FileList | null) => void;
  onFileRemove: (index: number) => void;
}

export function AgentFormData({
  title,
  description,
  type,
  files,
  onTitleChange,
  onDescriptionChange,
  onTypeChange,
  onFileUpload,
  onFileRemove,
}: AgentFormDataProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Agente</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ex: Agente de Boas-vindas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo do Agente</Label>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Atendimento">Atendimento</SelectItem>
              <SelectItem value="Agendamento">Agendamento</SelectItem>
              <SelectItem value="Suporte">Suporte</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição/Objetivo do Agente</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Descreva o que este agente deve fazer..."
          rows={4}
        />
      </div>

      <FileUploadSection
        label="Upload de Arquivos"
        files={files}
        onFileUpload={onFileUpload}
        onFileRemove={onFileRemove}
        id="file-upload"
      />
    </div>
  );
}
