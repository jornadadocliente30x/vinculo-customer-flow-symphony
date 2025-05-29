
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

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
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-2">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-sm font-medium text-gray-600">
          {platform}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="flex justify-center mb-2">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              className="text-blue-500"
            />
          </svg>
        </div>
        <div className="text-sm text-gray-500">{percentage}% do total</div>
      </CardContent>
    </Card>
  );
}
