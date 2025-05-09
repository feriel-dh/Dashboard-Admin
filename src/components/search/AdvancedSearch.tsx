
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Filter, Search, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const categories = [
  'Téléphone', 'Portefeuille', 'Clés', 'Vêtements', 
  'Sac/Bagages', 'Bijou', 'Ordinateur', 'Document', 'Autre'
];

interface SearchFilters {
  keywords: string;
  type: string;
  category: string;
  dateRange: string;
  distance: number;
  withPhotos: boolean;
  withLocation: boolean;
}

const AdvancedSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: '',
    type: '',
    category: '',
    dateRange: '',
    distance: 10,
    withPhotos: false,
    withLocation: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: keyof SearchFilters, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: keyof SearchFilters, checked: boolean) => {
    setFilters({
      ...filters,
      [name]: checked
    });
  };

  const handleDistanceChange = (value: number[]) => {
    setFilters({
      ...filters,
      distance: value[0]
    });
  };

  const handleSearch = () => {
    console.log('Search with filters:', filters);
    // Implement search functionality
  };

  const clearFilters = () => {
    setFilters({
      keywords: '',
      type: '',
      category: '',
      dateRange: '',
      distance: 10,
      withPhotos: false,
      withLocation: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recherche avancée</CardTitle>
        <CardDescription>
          Utilisez les filtres pour affiner votre recherche d'objets perdus ou trouvés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main search bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="keywords"
              placeholder="Rechercher un objet (nom, description, couleur...)"
              className="pl-9"
              value={filters.keywords}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Base filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <Select
              value={filters.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type d'objet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lost">Objets perdus</SelectItem>
                <SelectItem value="found">Objets trouvés</SelectItem>
                <SelectItem value="all">Tous les objets</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleSelectChange('dateRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes dates</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois-ci</SelectItem>
                <SelectItem value="quarter">3 derniers mois</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Advanced filters */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced-filters">
              <AccordionTrigger className="py-2">
                <div className="flex items-center text-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres avancés
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Distance maximale: {filters.distance} km</Label>
                    </div>
                    <Slider
                      defaultValue={[filters.distance]}
                      max={100}
                      step={1}
                      onValueChange={handleDistanceChange}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withPhotos"
                        checked={filters.withPhotos}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('withPhotos', checked === true)
                        }
                      />
                      <Label htmlFor="withPhotos">Avec photos uniquement</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withLocation"
                        checked={filters.withLocation}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('withLocation', checked === true)
                        }
                      />
                      <Label htmlFor="withLocation">Avec coordonnées GPS uniquement</Label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Action buttons */}
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Effacer filtres
            </Button>
            
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
