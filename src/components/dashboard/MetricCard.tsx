
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: ReactNode;
  description?: string;
  sparklineData?: number[];
  gradient?: 'brand' | 'success' | 'warning' | 'info';
}

const gradientVariants = {
  brand: 'from-brand-500 to-purple-500',
  success: 'from-emerald-500 to-teal-500',
  warning: 'from-amber-500 to-orange-500',
  info: 'from-cyan-500 to-blue-500'
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  description, 
  sparklineData,
  gradient = 'brand'
}: MetricCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 rounded-xl">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-lg bg-gradient-to-r transition-transform duration-200 group-hover:scale-110",
          gradientVariants[gradient]
        )}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
          {value}
        </div>
        
        {change && (
          <div className="flex items-center text-sm mb-4">
            {trend === 'up' ? (
              <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span className="font-medium">{change}</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span className="font-medium">{change}</span>
              </div>
            )}
            {description && (
              <span className="ml-2 text-gray-500">{description}</span>
            )}
          </div>
        )}
        
        {sparklineData && (
          <div className="mt-4">
            <div className="flex items-end space-x-1 h-10">
              {sparklineData.map((value, index) => {
                const height = (value / Math.max(...sparklineData)) * 100;
                return (
                  <div
                    key={index}
                    className={cn(
                      "bg-gradient-to-t rounded-sm flex-1 min-w-[3px] transition-all duration-300 group-hover:opacity-90",
                      gradientVariants[gradient]
                    )}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
