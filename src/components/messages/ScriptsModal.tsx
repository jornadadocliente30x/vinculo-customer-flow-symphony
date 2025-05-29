
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { MessageScript } from '@/types/messages';

interface ScriptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveScript: (script: Omit<MessageScript, 'id'>) => void;
}

export function ScriptsModal({ isOpen, onClose, onSaveScript }: ScriptsModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!title || !content) return;

    onSaveScript({
      title,
      content,
      attachments: attachments.map(file => ({
        id: Math.random().toString(),
        type: file.type.startsWith('image') ? 'image' : 
              file.type.startsWith('video') ? 'video' :
              file.type.startsWith('audio') ? 'audio' : 'document',
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
      })),
    });

    // Reset form
    setTitle('');
    setContent('');
    setAttachments([]);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Script de Mensagem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do script"
            />
          </div>

          {/* Message Content */}
          <div>
            <Label htmlFor="content">Mensagem</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite o conteúdo da mensagem"
              rows={4}
            />
          </div>

          {/* File Attachments */}
          <div>
            <Label>Anexos (Áudio, Vídeo, Arquivos)</Label>
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Clique para enviar arquivos
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Áudio, Vídeo, Imagens, Documentos até 10MB
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="audio/*,video/*,image/*,.pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!title || !content}
              className="bg-gradient-brand hover:opacity-90"
            >
              Salvar Script
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
