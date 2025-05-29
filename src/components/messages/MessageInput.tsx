
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'audio') => void;
  onAttachFile: (file: File, type: 'image' | 'video' | 'document') => void;
}

export function MessageInput({ onSendMessage, onAttachFile }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (type: 'image' | 'video' | 'document') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 
                   type === 'video' ? 'video/*' : 
                   '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onAttachFile(file, type);
      }
    };
    input.click();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simular gravação
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage('Mensagem de áudio gravada', 'audio');
      }, 3000);
    }
  };

  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨'];

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end space-x-2">
        {/* Attachment Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
              <Paperclip className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleFileSelect('image')}>
              📷 Foto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFileSelect('video')}>
              🎥 Vídeo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFileSelect('document')}>
              📄 Documento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Message Input */}
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite uma mensagem..."
            className="pr-10 rounded-full border-gray-300 focus:border-brand-500"
          />
          
          {/* Emoji Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-600"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-6 gap-1">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-lg hover:bg-brand-50"
                    onClick={() => setMessage(prev => prev + emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Audio/Send Button */}
        {message.trim() ? (
          <Button 
            onClick={handleSend}
            className="bg-gradient-brand hover:opacity-90 rounded-full h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "ghost"}
            className={`rounded-full h-10 w-10 p-0 ${isRecording ? '' : 'text-gray-500 hover:text-brand-600'}`}
          >
            <Mic className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isRecording && (
        <div className="mt-2 flex items-center justify-center text-red-500 text-sm">
          <div className="animate-pulse">● Gravando áudio...</div>
        </div>
      )}
    </div>
  );
}
