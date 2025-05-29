
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: ReactNode;
  description?: string;
  sparklineData?: number[];
}

export function MetricCard({ title, value, change, trend, icon, description, sparklineData }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-gray-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-gray-600 mt-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
              {change}
            </span>
            <span className="ml-1">{description}</span>
          </div>
        )}
        {sparklineData && (
          <div className="mt-3">
            <div className="flex items-end space-x-1 h-8">
              {sparklineData.map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-200 rounded-sm flex-1 min-w-[2px]"
                  style={{ height: `${(value / Math.max(...sparklineData)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
