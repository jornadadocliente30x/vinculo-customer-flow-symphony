
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Teeth } from 'lucide-react';

interface ToothSelectorProps {
  selectedTeeth: number[];
  onTeethChange: (teeth: number[]) => void;
}

export function ToothSelector({ selectedTeeth, onTeethChange }: ToothSelectorProps) {
  const handleToothToggle = (toothNumber: number) => {
    const newSelection = selectedTeeth.includes(toothNumber)
      ? selectedTeeth.filter(t => t !== toothNumber)
      : [...selectedTeeth, toothNumber];
    onTeethChange(newSelection);
  };

  // Numeração padrão odontológica
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const renderToothRow = (teeth: number[], label: string) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="grid grid-cols-8 gap-2 lg:grid-cols-16 lg:gap-1">
        {teeth.map((toothNum) => (
          <div key={toothNum} className="flex flex-col items-center space-y-1">
            <div className="relative">
              <Checkbox
                id={`tooth-${toothNum}`}
                checked={selectedTeeth.includes(toothNum)}
                onCheckedChange={() => handleToothToggle(toothNum)}
                className="sr-only"
              />
              <label
                htmlFor={`tooth-${toothNum}`}
                className={`
                  cursor-pointer flex items-center justify-center w-8 h-8 rounded border-2 transition-all
                  ${selectedTeeth.includes(toothNum) 
                    ? 'bg-brand-100 border-brand-500 text-brand-700' 
                    : 'bg-white border-gray-300 hover:border-brand-300'
                  }
                `}
              >
                <Teeth className="w-4 h-4" />
              </label>
            </div>
            <span className="text-xs text-gray-600 font-mono">{toothNum}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center space-x-2">
          <Teeth className="w-5 h-5 text-brand-500" />
          <span>Seletor de Dentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderToothRow(upperTeeth, "Arcada Superior")}
        {renderToothRow(lowerTeeth, "Arcada Inferior")}
        
        {selectedTeeth.length > 0 && (
          <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded">
            <Label className="text-sm font-medium text-brand-700">
              Dentes Selecionados: {selectedTeeth.join(', ')}
            </Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
