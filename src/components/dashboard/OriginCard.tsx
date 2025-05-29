
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OriginCardProps {
  platform: string;
  icon: ReactNode;
  value: string;
  percentage: string;
  color: string;
}

export function OriginCard({ platform, icon, value, percentage, color }: OriginCardProps) {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(parseFloat(percentage) / 100) * circumference} ${circumference}`;

  return (
    <Card className="group text-center hover:shadow-medium transition-all duration-300 rounded-xl border border-gray-100 bg-white overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-center mb-3">
          <div className={cn(
            "p-3 rounded-xl transition-transform duration-200 group-hover:scale-110",
            color
          )}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
          {platform}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
          {value}
        </div>
        
        <div className="flex justify-center mb-3">
          <div className="relative">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="32"
                cy="32"
                r="20"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                className="transition-all duration-500 group-hover:stroke-width-4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">{percentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
          {percentage}% do total
        </div>
      </CardContent>
    </Card>
  );
}
