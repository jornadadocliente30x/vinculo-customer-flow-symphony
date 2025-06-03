
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function SupportCard() {
  return (
    <Card className="w-full bg-white border border-gray-200 shadow-soft rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm text-left">Suporte</h3>
              <p className="text-xs text-gray-500 mt-1 text-left">
                Precisa de ajuda? Entre em contato com nosso suporte técnico.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Disponibilidade</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: '85%' }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs h-8 border-gray-300 hover:bg-gray-50"
              onClick={() => window.open('https://wa.me/554898031208', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
