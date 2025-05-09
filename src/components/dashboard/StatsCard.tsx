
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  percentage?: number;
  positive?: boolean;
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  percentage,
  positive = true
}: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {percentage !== undefined && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs font-medium",
                  positive ? "text-green-500" : "text-red-500"
                )}>
                  {positive ? "+" : "-"}{percentage}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">depuis le mois dernier</span>
              </div>
            )}
          </div>
          <div className={cn("p-2 rounded-full", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
