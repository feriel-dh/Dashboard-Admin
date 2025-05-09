import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface Location {
  id: number;
  type: 'lost' | 'found' | 'returned';
  title: string;
  description: string;
  location?: string;
  lat?: number;
  lng?: number;
  date: string;
  category: string;
  image?: string;
}

interface RecentActivityCardProps {
  activities: Location[];
}

const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-md bg-muted/50">
              <div className={`w-2 h-10 rounded-full ${
                activity.type === 'found' ? 'bg-green-500' :
                activity.type === 'lost' ? 'bg-lostfound-orange' :
                'bg-blue-500'
              }`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge variant={activity.type === 'found' ? 'default' :
                    activity.type === 'lost' ? 'destructive' :
                    'outline'}>
                    {activity.type === 'found' ? 'Trouvé' : 
                     activity.type === 'lost' ? 'Perdu' : 'Retourné'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {activity.location && activity.location.trim() !== ''
                        ? activity.location
                        : 'Localisation non disponible'}
                    </span>
                  </div>
                  <span>{activity.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.category}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
