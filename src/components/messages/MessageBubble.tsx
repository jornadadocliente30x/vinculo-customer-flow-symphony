
import { useState } from 'react';
import { ChatMessage } from '@/types/messages';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageAttachmentComponent } from './MessageAttachment';
import { AudioPlayer } from './AudioPlayer';
import { QuickReplyModal } from './QuickReplyModal';
import { cn } from '@/lib/utils';
import { Check, CheckCheck, MoreHorizontal } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isConsecutive?: boolean;
  contactName?: string;
  contactAvatar?: string;
  onSendReply?: (reply: string) => void;
}

export function MessageBubble({ 
  message, 
  isConsecutive = false, 
  contactName = '',
  contactAvatar,
  onSendReply
}: MessageBubbleProps) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
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

  const handleReply = (reply: string) => {
    if (onSendReply) {
      onSendReply(reply);
    }
  };

  const hasAttachments = message.attachments && message.attachments.length > 0;
  const isAudioMessage = message.type === 'audio' || 
    (hasAttachments && message.attachments?.some(att => att.type === 'audio'));

  return (
    <div className={cn(
      "flex items-end space-x-2 mb-4 group",
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

      <div className="max-w-xs lg:max-w-md relative">
        {/* Três pontinhos para resposta */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-6 w-6 p-0",
            isOutbound ? "-left-8" : "-right-8"
          )}
          onClick={() => setIsReplyModalOpen(true)}
        >
          <MoreHorizontal className="h-3 w-3 text-gray-500" />
        </Button>

        {/* Audio Message */}
        {isAudioMessage && (
          <div className="mb-2">
            <AudioPlayer
              audioUrl={message.attachments?.[0]?.url || '/audio-placeholder.mp3'}
              duration="0:15"
              isOutbound={isOutbound}
            />
          </div>
        )}

        {/* Regular Attachments */}
        {hasAttachments && !isAudioMessage && (
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

        {/* Text message */}
        {message.content && !isAudioMessage && (
          <div className={cn(
            "px-4 py-2 rounded-2xl relative shadow-sm",
            isOutbound 
              ? "bg-white text-gray-900 rounded-br-md border border-gray-200" 
              : "bg-gradient-to-r from-blue-50 to-brand-50 text-gray-900 rounded-bl-md border border-blue-100"
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

      {/* Quick Reply Modal */}
      <QuickReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        originalMessage={message.content}
        contactName={contactName}
        onSendReply={handleReply}
      />
    </div>
  );
}
