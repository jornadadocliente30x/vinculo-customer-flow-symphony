
import { ChatMessage } from '@/types/messages';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageAttachmentComponent } from './MessageAttachment';
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

  const hasAttachments = message.attachments && message.attachments.length > 0;

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

      <div className="max-w-xs lg:max-w-md">
        {/* Attachments */}
        {hasAttachments && (
          <div className="mb-2 space-y-2">
            {message.attachments!.map((attachment) => (
              <MessageAttachmentComponent
                key={attachment.id}
                attachment={attachment}
                isOutbound={isOutbound}
              />
            ))}
          </div>
        )}

        {/* Text message com cores atualizadas */}
        {message.content && (
          <div className={cn(
            "px-4 py-2 rounded-2xl relative",
            isOutbound 
              ? "bg-white text-gray-900 rounded-br-md border border-gray-200 shadow-sm" 
              : "bg-blue-50 text-gray-900 rounded-bl-md border border-blue-100"
          )}>
            <p className="text-sm leading-relaxed">{message.content}</p>
            
            <div className={cn(
              "flex items-center justify-end space-x-1 mt-1",
              isOutbound ? "text-gray-500" : "text-blue-600"
            )}>
              <span className="text-xs">{formatTime(message.timestamp)}</span>
              {isOutbound && getStatusIcon()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
