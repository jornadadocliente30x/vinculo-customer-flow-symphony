
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Bot } from 'lucide-react';
import { Agent } from '@/types/agents';
import { mockAgents } from '@/data/mockAgents';
import { AgentCard } from '@/components/agents/AgentCard';
import { AgentModal } from '@/components/agents/AgentModal';
import { useToast } from '@/hooks/use-toast';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>();
  const { toast } = useToast();

  const handleCreateAgent = () => {
    setEditingAgent(undefined);
    setIsModalOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  const handleSaveAgent = (agentData: Partial<Agent>) => {
    if (editingAgent) {
      // Editar agente existente
      setAgents(prev => prev.map(agent => 
        agent.id === editingAgent.id 
          ? { ...agent, ...agentData } as Agent
          : agent
      ));
      toast({
        title: "Agente atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      // Criar novo agente
      const newAgent: Agent = {
        ...agentData,
        id: Date.now().toString(),
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Agent;
      
      setAgents(prev => [...prev, newAgent]);
      toast({
        title: "Agente criado",
        description: "O novo agente foi criado com sucesso.",
      });
    }
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    toast({
      title: "Agente excluído",
      description: "O agente foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const handleToggleStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { 
            ...agent, 
            status: agent.status === 'Ativo' ? 'Inativo' : 'Ativo',
            updatedAt: new Date()
          }
        : agent
    ));

    const agent = agents.find(a => a.id === agentId);
    const newStatus = agent?.status === 'Ativo' ? 'Inativo' : 'Ativo';
    
    toast({
      title: `Agente ${newStatus.toLowerCase()}`,
      description: `O agente foi ${newStatus.toLowerCase()} com sucesso.`,
    });
  };

  const activeAgents = agents.filter(agent => agent.status === 'Ativo').length;
  const totalAgents = agents.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Bot className="w-8 h-8 mr-3 text-brand-600" />
              Agentes de IA
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus agentes automatizados para atendimento, agendamento e suporte
            </p>
          </div>
          
          <Button onClick={handleCreateAgent} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Criar Agente</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bot className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total de Agentes</p>
                <p className="text-2xl font-bold text-gray-900">{totalAgents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Agentes Ativos</p>
                <p className="text-2xl font-bold text-green-600">{activeAgents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Agentes Inativos</p>
                <p className="text-2xl font-bold text-red-600">{totalAgents - activeAgents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={handleEditAgent}
              onDelete={handleDeleteAgent}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>

        {/* Empty State */}
        {agents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum agente criado
            </h3>
            <p className="text-gray-600 mb-4">
              Comece criando seu primeiro agente de IA para automatizar o atendimento.
            </p>
            <Button onClick={handleCreateAgent}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Agente
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAgent}
        agent={editingAgent}
      />
    </DashboardLayout>
  );
}
