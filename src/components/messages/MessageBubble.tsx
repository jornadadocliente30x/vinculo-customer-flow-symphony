
import { ChatMessage } from '@/types/messages';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isConsecutive?: boolean;
  contactName?: string;
  contactAvatar?: string;
}

export function MessageBubble({ 
  message, 
  isConsecutive = false, 
  contactName = '',
  contactAvatar 
}: MessageBubbleProps) {
  const isOutbound = message.direction === 'outbound';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-brand-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex items-end space-x-2 mb-4",
      isOutbound ? "justify-end" : "justify-start"
    )}>
      {!isOutbound && !isConsecutive && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={contactAvatar} />
          <AvatarFallback className="text-xs">
            {contactName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      )}
      
      {!isOutbound && isConsecutive && <div className="w-8" />}

      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative",
        isOutbound 
          ? "bg-gradient-brand text-white rounded-br-md" 
          : "bg-gray-100 text-gray-900 rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        
        <div className={cn(
          "flex items-center justify-end space-x-1 mt-1",
          isOutbound ? "text-white/70" : "text-gray-500"
        )}>
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {isOutbound && getStatusIcon()}
        </div>
      </div>
    </div>
  );
}
