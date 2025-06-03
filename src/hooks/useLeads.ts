
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leadsService';
import { useToast } from '@/hooks/use-toast';
import type { CreateLeadData, UpdateLeadData } from '@/types/database';

export const useLeads = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const leadsQuery = useQuery({
    queryKey: ['leads'],
    queryFn: leadsService.getAllLeads,
  });

  const etapasQuery = useQuery({
    queryKey: ['etapas-jornada'],
    queryFn: leadsService.getEtapasJornada,
  });

  const statusQuery = useQuery({
    queryKey: ['status-lead'],
    queryFn: leadsService.getStatusLead,
  });

  const origensQuery = useQuery({
    queryKey: ['origens-lead'],
    queryFn: leadsService.getOrigensLead,
  });

  const createLeadMutation = useMutation({
    mutationFn: leadsService.createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead criado",
        description: "Novo lead foi criado com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error creating lead:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o lead.",
        variant: "destructive",
      });
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: leadsService.updateLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead atualizado",
        description: "As informações do lead foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error updating lead:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o lead.",
        variant: "destructive",
      });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: leadsService.deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead excluído",
        description: "O lead foi removido com sucesso.",
        variant: "destructive",
      });
    },
    onError: (error) => {
      console.error('Error deleting lead:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o lead.",
        variant: "destructive",
      });
    },
  });

  return {
    leads: leadsQuery.data || [],
    etapas: etapasQuery.data || [],
    statusOptions: statusQuery.data || [],
    origens: origensQuery.data || [],
    isLoading: leadsQuery.isLoading || etapasQuery.isLoading || statusQuery.isLoading || origensQuery.isLoading,
    error: leadsQuery.error || etapasQuery.error || statusQuery.error || origensQuery.error,
    createLead: createLeadMutation.mutate,
    updateLead: updateLeadMutation.mutate,
    deleteLead: deleteLeadMutation.mutate,
    isCreating: createLeadMutation.isPending,
    isUpdating: updateLeadMutation.isPending,
    isDeleting: deleteLeadMutation.isPending,
  };
};
