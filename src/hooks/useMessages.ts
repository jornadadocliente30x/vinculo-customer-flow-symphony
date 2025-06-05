
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService, mensagemService, statusChatService } from '@/services/messages.service';
import { useToast } from '@/hooks/use-toast';

export const useMessages = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const chatsQuery = useQuery({
    queryKey: ['chats'],
    queryFn: () => chatService.getChatsWithMessages(),
  });

  const statusChatQuery = useQuery({
    queryKey: ['status-chat'],
    queryFn: () => statusChatService.findAll({ ativo: true }),
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: any) => mensagemService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      toast({
        title: "Mensagem enviada",
        description: "Mensagem enviada com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (messageId: number) => mensagemService.markAsRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  return {
    chats: chatsQuery.data || [],
    statusOptions: statusChatQuery.data || [],
    isLoading: chatsQuery.isLoading || statusChatQuery.isLoading,
    error: chatsQuery.error || statusChatQuery.error,
    sendMessage: sendMessageMutation.mutate,
    markAsRead: markAsReadMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
};
