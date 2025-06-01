import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Download, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reportOptions = [
  {
    id: 'metrics',
    label: 'Métricas Gerais',
    description: 'Total de Leads, Conversões, Mensagens, Taxa de Conversão'
  },
  {
    id: 'revenue',
    label: 'Receitas',
    description: 'Receita Potencial, Real e Possível'
  },
  {
    id: 'contacts-origin',
    label: 'Origem dos Contatos',
    description: 'Instagram, LinkedIn, TikTok, Site, Google'
  },
  {
    id: 'sales-funnel',
    label: 'Funil de Vendas',
    description: 'Leads, Agendamentos, Jornada'
  },
  {
    id: 'customer-journey',
    label: 'Customer Journey',
    description: 'Assimilação, Utilização, Adoção, Expansão, Evangelismo'
  },
  {
    id: 'service-metrics',
    label: 'Métricas de Atendimento',
    description: 'Tempo de resposta, satisfação, tickets'
  },
  {
    id: 'campaigns',
    label: 'Campanhas Recentes',
    description: 'Performance e resultados das campanhas'
  }
];

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOptionChange = (optionId: string, checked: boolean) => {
    setSelectedOptions(prev => 
      checked 
        ? [...prev, optionId]
        : prev.filter(id => id !== optionId)
    );
  };

  const handleSelectAll = () => {
    setSelectedOptions(
      selectedOptions.length === reportOptions.length 
        ? [] 
        : reportOptions.map(option => option.id)
    );
  };

  const handleGenerateReport = async () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "Seleção necessária",
        description: "Por favor, selecione pelo menos uma opção para gerar o relatório.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simular geração do relatório
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Relatório gerado com sucesso!",
        description: `Relatório Excel com ${selectedOptions.length} seção(ões) foi baixado.`,
      });

      // Reset e fechar modal
      setSelectedOptions([]);
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao gerar relatório",
        description: "Ocorreu um erro durante a geração. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      setSelectedOptions([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600" />
            Gerar Relatório Excel
          </DialogTitle>
          <DialogDescription>
            Selecione as seções que deseja incluir no seu relatório personalizado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Select All Option */}
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox
              id="select-all"
              checked={selectedOptions.length === reportOptions.length}
              onCheckedChange={handleSelectAll}
              disabled={isGenerating}
            />
            <Label 
              htmlFor="select-all" 
              className="text-sm font-medium cursor-pointer"
            >
              Selecionar todas as opções
            </Label>
          </div>

          {/* Individual Options */}
          {reportOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                disabled={isGenerating}
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={option.id} 
                  className="text-sm font-medium cursor-pointer block"
                >
                  {option.label}
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isGenerating}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório Excel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
