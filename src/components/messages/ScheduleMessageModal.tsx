
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { ScheduledMessage } from '@/types/messages';

interface ScheduleMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onSchedule: (message: Omit<ScheduledMessage, 'id'>) => void;
}

export function ScheduleMessageModal({ 
  isOpen, 
  onClose, 
  conversationId, 
  onSchedule 
}: ScheduleMessageModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!title || !content || !date || !time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    onSchedule({
      conversationId,
      title,
      description,
      content,
      scheduledDate,
      attachments: attachments.map(file => ({
        id: Math.random().toString(),
        type: file.type.startsWith('image') ? 'image' : 
              file.type.startsWith('video') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
      })),
      status: 'pending',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setContent('');
    setDate(undefined);
    setTime('');
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendar Mensagem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do agendamento"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do agendamento (opcional)"
              rows={3}
            />
          </div>

          {/* Message Content */}
          <div>
            <Label htmlFor="content">Mensagem</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite a mensagem que será enviada"
              rows={4}
            />
          </div>

          {/* File Attachments */}
          <div>
            <Label>Anexos</Label>
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
                        PNG, JPG, PDF, DOC até 10MB
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*,video/*,.pdf,.doc,.docx"
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

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Data</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!title || !content || !date || !time}
              className="bg-gradient-brand hover:opacity-90"
            >
              Agendar Mensagem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
