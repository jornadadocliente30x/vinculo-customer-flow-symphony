
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatMessage, Conversation } from '@/types/messages';
import { MoreVertical, Phone, VideoIcon, Search } from 'lucide-react';

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (content: string, type: 'text' | 'audio') => void;
  onAttachFile: (file: File, type: 'image' | 'video' | 'document') => void;
}

export function ChatArea({ 
  conversation, 
  messages, 
  onSendMessage, 
  onAttachFile 
}: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">💬</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecione uma conversa
          </h3>
          <p className="text-gray-500">
            Escolha uma conversa na lista para começar a conversar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>
                  {conversation.contactName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">{conversation.contactName}</h3>
              <p className="text-sm text-gray-500">
                {conversation.isOnline ? 'Online' : 'Visto por último hoje'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <VideoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-1">
          {messages.map((message, index) => {
            const isConsecutive = index > 0 && 
              messages[index - 1].direction === message.direction &&
              (message.timestamp.getTime() - messages[index - 1].timestamp.getTime()) < 300000; // 5 minutes

            return (
              <MessageBubble
                key={message.id}
                message={message}
                isConsecutive={isConsecutive}
                contactName={conversation.contactName}
                contactAvatar={conversation.avatar}
              />
            );
          })}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput 
        onSendMessage={onSendMessage}
        onAttachFile={onAttachFile}
      />
    </div>
  );
}
