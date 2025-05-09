
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom markers
const lostIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const foundIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Location {
  id: number;
  type: 'lost' | 'found';
  title: string;
  description: string;
  lat: number;
  lng: number;
  date: string;
  category: string;
  image?: string;
}

const MapPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Sample data
  const locations: Location[] = [
    {
      id: 1,
      type: 'lost',
      title: 'Portefeuille noir',
      description: 'Portefeuille en cuir noir avec carte d\'identité et carte bancaire',
      lat: 48.8453,
      lng: 2.3752,
      date: '2 mai 2025',
      category: 'Portefeuille',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      type: 'found',
      title: 'Clés avec porte-clés bleu',
      description: 'Trousseau de 3 clés avec un porte-clés dauphin bleu',
      lat: 48.8763,
      lng: 2.3824,
      date: '1 mai 2025',
      category: 'Clés',
      image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      type: 'found',
      title: 'iPhone 15 Pro',
      description: 'iPhone 15 Pro gris sidéral, écran fissuré',
      lat: 48.8511,
      lng: 2.2857,
      date: '30 avril 2025',
      category: 'Téléphone',
      image: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 4,
      type: 'lost',
      title: 'Sac à main rouge',
      description: 'Sac à main en cuir rouge avec une bandoulière dorée',
      lat: 48.8606,
      lng: 2.3376,
      date: '29 avril 2025',
      category: 'Sac/Bagages',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 5,
      type: 'found',
      title: 'Lunettes de soleil Ray-Ban',
      description: 'Lunettes de soleil Ray-Ban Wayfarer noires',
      lat: 48.8738,
      lng: 2.2950,
      date: '28 avril 2025',
      category: 'Accessoire',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 6,
      type: 'lost',
      title: 'Ordinateur portable Dell',
      description: 'Ordinateur portable Dell XPS 13, couleur argent',
      lat: 48.8566,
      lng: 2.3522,
      date: '27 avril 2025',
      category: 'Ordinateur',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop'
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Filter by lost/found/all
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  
  const filteredLocations = filter === 'all' ? 
    locations : 
    locations.filter(loc => loc.type === filter);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Carte des objets</h1>
          <p className="text-muted-foreground">Visualisez la localisation des objets perdus et trouvés</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader>
                <CardTitle>Chargement de la carte...</CardTitle>
              </CardHeader>
              <div className="h-[calc(100%-80px)] p-4 flex items-center justify-center bg-muted">
                <p>Initialisation de la carte...</p>
              </div>
            </Card>
          </div>
          <div className="h-[calc(100vh-200px)]">
            <Card className="h-full"></Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Carte des objets</h1>
        <p className="text-muted-foreground">Visualisez la localisation des objets perdus et trouvés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Side */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Carte interactive</CardTitle>
                <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as 'all' | 'lost' | 'found')}>
                  <TabsList>
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="lost">Perdus</TabsTrigger>
                    <TabsTrigger value="found">Trouvés</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">Objets perdus</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm">Objets trouvés</span>
                </div>
              </CardDescription>
            </CardHeader>
            
            {/* Map Container */}
            <div className="h-[calc(100%-80px)] p-4">
              <MapContainer
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                zoom={12}
                center={[48.8566, 2.3522] as [number, number]} // Center on Paris
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredLocations.map((loc) => (
                  <Marker 
                    key={loc.id} 
                    position={[loc.lat, loc.lng] as [number, number]} 
                    icon={loc.type === 'lost' ? lostIcon : foundIcon}
                    eventHandlers={{
                      click: () => handleMarkerClick(loc)
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-medium">{loc.title}</h3>
                        <p className="text-sm text-gray-600">{loc.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{loc.date}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </div>
        
        {/* Details Side */}
        <div className="h-[calc(100vh-200px)]">
          <Card className="h-full overflow-auto">
            <CardHeader>
              <CardTitle>Détails de l'objet</CardTitle>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-sm">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filtrer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-1" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {selectedLocation ? (
              <div className="p-4">
                <div className="space-y-4">
                  {selectedLocation.image && (
                    <img 
                      src={selectedLocation.image} 
                      alt={selectedLocation.title} 
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{selectedLocation.title}</h3>
                    <Badge variant={selectedLocation.type === 'lost' ? 'destructive' : 'default'}>
                      {selectedLocation.type === 'lost' ? 'Perdu' : 'Trouvé'}
                    </Badge>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground text-xs">Catégorie</Label>
                    <p className="text-sm">{selectedLocation.category}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground text-xs">Description</Label>
                    <p className="text-sm">{selectedLocation.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-muted-foreground text-xs">Date</Label>
                      <p className="text-sm">{selectedLocation.date}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Localisation</Label>
                      <p className="text-sm flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-x-2 flex">
                    <Button className="flex-1">
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-center">
                <div className="space-y-2">
                  <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Sélectionnez un marqueur sur la carte pour afficher les détails
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
