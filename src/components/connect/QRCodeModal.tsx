
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Smartphone, Wifi, MessageSquare } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [step, setStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsConnected(false);
    }
  }, [isOpen]);

  const handleSimulateConnection = () => {
    setStep(2);
    setTimeout(() => {
      setIsConnected(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  const steps = [
    {
      number: 1,
      title: 'Abra o WhatsApp no seu celular',
      description: 'Vá para Configurações > Aparelhos conectados',
      icon: Smartphone
    },
    {
      number: 2,
      title: 'Escaneie o QR Code',
      description: 'Aponte a câmera do celular para o código',
      icon: Wifi
    },
    {
      number: 3,
      title: 'Confirme a conexão',
      description: 'Aguarde a confirmação no seu dispositivo',
      icon: MessageSquare
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Conectar WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!isConnected ? (
            <>
              {/* QR Code */}
              <div className="flex justify-center">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 ${
                              Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map((stepItem) => (
                  <div
                    key={stepItem.number}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                      step >= stepItem.number ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step > stepItem.number
                          ? 'bg-green-500 text-white'
                          : step === stepItem.number
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        stepItem.number
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{stepItem.title}</h4>
                      <p className="text-xs text-gray-600">{stepItem.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSimulateConnection}
                  className="flex-1 bg-gradient-brand hover:from-blue-700 hover:to-purple-700"
                >
                  Simular Conexão
                </Button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700">
                  WhatsApp Conectado!
                </h3>
                <p className="text-sm text-gray-600">
                  Sua instância foi conectada com sucesso
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
