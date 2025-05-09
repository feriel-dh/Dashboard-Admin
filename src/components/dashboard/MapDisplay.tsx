
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  item: string;
  description: string;
  lat: number;
  lng: number;
  date: string;
}

interface MapDisplayProps {
  locations: Location[];
}

const MapDisplay = ({ locations }: MapDisplayProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleLeafletContainerStyle = () => {
      const allMapContainers = document.querySelectorAll('.leaflet-container');
      allMapContainers.forEach((container) => {
        if (container instanceof HTMLElement) {
          container.style.width = '100%';
          container.style.height = '400px';
          container.style.borderRadius = '0.5rem';
        }
      });
    };

    // Apply styles after map renders
    setTimeout(handleLeafletContainerStyle, 100);
  }, []);

  if (!isMounted) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Carte des objets</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] w-full bg-muted flex items-center justify-center">
            Chargement de la carte...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Carte des objets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            className="rounded-b-lg"
            center={[36.8065, 10.1815] as [number, number]} // Center on Tunisia (Tunis)
            zoom={7} // Zoomed out a bit to show more of Tunisia
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((loc) => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng] as [number, number]}
                icon={loc.type === 'lost' ? lostIcon : foundIcon}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">{loc.item}</h3>
                    <p className="text-sm text-gray-600">{loc.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{loc.date}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
