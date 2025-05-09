
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Eye, MapPin } from 'lucide-react';

interface ItemCardProps {
  id: string | number;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  status: 'lost' | 'found' | 'returned';
  image?: string;
  onView?: () => void;
  onContact?: () => void;
}

const ItemCard = ({
  id,
  title,
  category,
  description,
  location,
  date,
  status,
  image,
  onView,
  onContact
}: ItemCardProps) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <div className="h-48 bg-muted">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <span className="text-muted-foreground">Pas d'image</span>
            </div>
          )}
        </div>
        <Badge 
          className="absolute top-3 right-3"
          variant={
            status === 'found' ? 'default' :
            status === 'lost' ? 'destructive' : 
            'outline'
          }
        >
          {status === 'found' ? 'Trouvé' : 
           status === 'lost' ? 'Perdu' : 
           'Retourné'}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold truncate">{title}</h3>
              <Badge variant="outline">{category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
          
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onView}
        >
          <Eye className="h-4 w-4 mr-2" />
          Voir
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          onClick={onContact}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
