
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService, etapasService, statusLeadService, origensService } from '@/services/leads.service';
import { useToast } from '@/hooks/use-toast';
import type { CreateLeadData, UpdateLeadData } from '@/types/database';

export const useLeadsUnified = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Queries
  const leadsQuery = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsService.getLeadsWithRelations(),
  });

  const etapasQuery = useQuery({
    queryKey: ['etapas-jornada'],
    queryFn: () => etapasService.getEtapasOrdenadas(),
  });

  const statusQuery = useQuery({
    queryKey: ['status-lead'],
    queryFn: () => statusLeadService.findAll({ ativo: true }),
  });

  const origensQuery = useQuery({
    queryKey: ['origens-lead'],
    queryFn: () => origensService.findAll({ ativo: true }),
  });

  // Mutations
  const createLeadMutation = useMutation({
    mutationFn: (data: CreateLeadData) => leadsService.create(data),
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
    mutationFn: ({ id, data }: { id: number; data: UpdateLeadData }) => 
      leadsService.update(id, data),
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
    mutationFn: (id: number) => leadsService.delete(id),
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

  const updateEtapaMutation = useMutation({
    mutationFn: ({ leadId, etapaId }: { leadId: number; etapaId: number }) =>
      leadsService.updateEtapa(leadId, etapaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  return {
    // Data
    leads: leadsQuery.data || [],
    etapas: etapasQuery.data || [],
    statusOptions: statusQuery.data || [],
    origens: origensQuery.data || [],
    
    // Loading states
    isLoading: leadsQuery.isLoading || etapasQuery.isLoading || statusQuery.isLoading || origensQuery.isLoading,
    isCreating: createLeadMutation.isPending,
    isUpdating: updateLeadMutation.isPending,
    isDeleting: deleteLeadMutation.isPending,
    
    // Error states
    error: leadsQuery.error || etapasQuery.error || statusQuery.error || origensQuery.error,
    
    // Actions
    createLead: createLeadMutation.mutate,
    updateLead: (id: number, data: UpdateLeadData) => updateLeadMutation.mutate({ id, data }),
    deleteLead: deleteLeadMutation.mutate,
    updateEtapa: (leadId: number, etapaId: number) => updateEtapaMutation.mutate({ leadId, etapaId }),
    
    // Utilities
    refetch: () => {
      leadsQuery.refetch();
      etapasQuery.refetch();
      statusQuery.refetch();
      origensQuery.refetch();
    },
  };
};
