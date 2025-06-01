
import { useState } from 'react';
import { ChatMessage } from '@/types/messages';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageAttachmentComponent } from './MessageAttachment';
import { AudioPlayer } from './AudioPlayer';
import { QuickReplyModal } from './QuickReplyModal';
import { EditMessageModal } from './EditMessageModal';
import { cn } from '@/lib/utils';
import { Check, CheckCheck, MoreHorizontal, Reply, Edit } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isConsecutive?: boolean;
  contactName?: string;
  contactAvatar?: string;
  onSendReply?: (reply: string, replyTo?: ChatMessage) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
}

export function MessageBubble({ 
  message, 
  isConsecutive = false, 
  contactName = '',
  contactAvatar,
  onSendReply,
  onEditMessage
}: MessageBubbleProps) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      onSendReply(reply, message);
    }
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    if (onEditMessage) {
      onEditMessage(messageId, newContent);
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
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-6 w-6 p-0",
                isOutbound ? "-left-8" : "-right-8"
              )}
            >
              <MoreHorizontal className="h-3 w-3 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isOutbound ? "end" : "start"} className="w-40">
            <DropdownMenuItem onClick={() => setIsReplyModalOpen(true)}>
              <Reply className="mr-2 h-4 w-4" />
              Responder
            </DropdownMenuItem>
            {isOutbound && (
              <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Mensagem
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reply Reference */}
        {message.replyTo && (
          <div className={cn(
            "mb-2 p-2 rounded-lg border-l-4 bg-gray-50 text-xs",
            isOutbound ? "border-brand-400" : "border-blue-400"
          )}>
            <div className="flex items-center space-x-1 mb-1">
              <Reply className="w-3 h-3 text-gray-500" />
              <span className="font-medium text-gray-600">{message.replyTo.senderName}</span>
            </div>
            <p className="text-gray-600 line-clamp-2">{message.replyTo.content}</p>
          </div>
        )}

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
            "px-4 py-3 rounded-2xl relative shadow-sm transition-all hover:shadow-md",
            isOutbound 
              ? "bg-white text-gray-900 rounded-br-md border border-gray-200" 
              : "bg-gradient-to-r from-blue-50 to-brand-50 text-gray-900 rounded-bl-md border border-blue-100"
          )}>
            <p className="text-sm leading-relaxed">{message.content}</p>
            
            <div className={cn(
              "flex items-center justify-end space-x-1 mt-2",
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

      {/* Edit Message Modal */}
      <EditMessageModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        message={message}
        onEditMessage={handleEditMessage}
      />
    </div>
  );
}
