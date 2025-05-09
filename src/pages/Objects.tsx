
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Plus } from 'lucide-react';
import ItemCard from '@/components/objects/ItemCard';
import ObjectDeclarationForm from '@/components/objects/ObjectDeclarationForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Item {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  status: 'lost' | 'found' | 'returned';
  image?: string;
}

const Objects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const sampleItems: Item[] = [
    {
      id: 1,
      title: 'Portefeuille noir',
      category: 'Portefeuille',
      description: 'Portefeuille en cuir noir avec carte d\'identité tunisienne et carte bancaire',
      location: 'Avenue Habib Bourguiba, Tunis',
      date: '2 mai 2025',
      status: 'lost',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      title: 'Clés avec porte-clés bleu',
      category: 'Clés',
      description: 'Trousseau de 3 clés avec un porte-clés dauphin bleu',
      location: 'Parc Belvédère, Tunis',
      date: '1 mai 2025',
      status: 'found',
      image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      title: 'iPhone 15 Pro',
      category: 'Téléphone',
      description: 'iPhone 15 Pro gris sidéral, écran fissuré, étui transparent',
      location: 'Tunisia Mall, Lac 2, Tunis',
      date: '30 avril 2025',
      status: 'returned',
      image: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      title: 'Sac à main rouge',
      category: 'Sac/Bagages',
      description: 'Sac à main en cuir rouge avec une bandoulière dorée et une pochette intérieure',
      location: 'Métro ligne 1, Tunis',
      date: '29 avril 2025',
      status: 'lost',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 5,
      title: 'Lunettes de soleil Ray-Ban',
      category: 'Accessoire',
      description: 'Lunettes de soleil Ray-Ban Wayfarer noires',
      location: 'Corniche de Sousse',
      date: '28 avril 2025',
      status: 'found',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 6,
      title: 'Ordinateur portable Dell',
      category: 'Ordinateur',
      description: 'Ordinateur portable Dell XPS 13, couleur argent',
      location: 'Café El Ali, Médina de Tunis',
      date: '27 avril 2025',
      status: 'lost',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 7,
      title: 'Carnet de notes noir',
      category: 'Document',
      description: 'Carnet Moleskine noir avec notes personnelles en arabe',
      location: 'Bibliothèque de Sfax',
      date: '26 avril 2025',
      status: 'found'
    },
    {
      id: 8,
      title: 'Appareil photo Canon',
      category: 'Électronique',
      description: 'Appareil photo Canon EOS R5 avec objectif 24-70mm',
      location: 'Amphithéâtre d’El Jem',
      date: '25 avril 2025',
      status: 'lost',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
  ];
  
  // Filter items based on status and search term
  const filteredItems = sampleItems.filter((item) => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des objets</h1>
          <p className="text-muted-foreground">Consultez et gérez les objets perdus et trouvés</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Déclarer un objet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nouvelle déclaration</DialogTitle>
                <DialogDescription>
                  Remplissez le formulaire pour déclarer un objet perdu ou trouvé
                </DialogDescription>
              </DialogHeader>
              <ObjectDeclarationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilterStatus}>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="lost">Perdus</TabsTrigger>
            <TabsTrigger value="found">Trouvés</TabsTrigger>
            <TabsTrigger value="returned">Retournés</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <div className="relative">
              <Input
                placeholder="Rechercher un objet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[250px]"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-auto">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filtrer</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
                <SelectItem value="az">A à Z</SelectItem>
                <SelectItem value="za">Z à A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tab contents - same grid of items for all tabs, filtering happens in JS */}
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                location={item.location}
                date={item.date}
                status={item.status}
                image={item.image}
                onView={() => console.log('View item', item.id)}
                onContact={() => console.log('Contact about item', item.id)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun objet ne correspond à votre recherche.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="lost" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                location={item.location}
                date={item.date}
                status={item.status}
                image={item.image}
                onView={() => console.log('View item', item.id)}
                onContact={() => console.log('Contact about item', item.id)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun objet perdu ne correspond à votre recherche.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="found" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                location={item.location}
                date={item.date}
                status={item.status}
                image={item.image}
                onView={() => console.log('View item', item.id)}
                onContact={() => console.log('Contact about item', item.id)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun objet trouvé ne correspond à votre recherche.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="returned" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                location={item.location}
                date={item.date}
                status={item.status}
                image={item.image}
                onView={() => console.log('View item', item.id)}
                onContact={() => console.log('Contact about item', item.id)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun objet retourné ne correspond à votre recherche.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Objects;
