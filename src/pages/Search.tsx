
import React, { useState } from 'react';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import ItemCard from '@/components/objects/ItemCard';

// Sample search results
const searchResults = [
  {
    id: 1,
    title: 'Portefeuille noir',
    category: 'Portefeuille',
    description: 'Portefeuille en cuir noir avec carte d\'identité et carte bancaire',
    location: 'Gare de Lyon, Paris',
    date: '2 mai 2025',
    status: 'lost' as const,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Clés avec porte-clés bleu',
    category: 'Clés',
    description: 'Trousseau de 3 clés avec un porte-clés dauphin bleu',
    location: 'Parc des Buttes-Chaumont, Paris',
    date: '1 mai 2025',
    status: 'found' as const,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'iPhone 15 Pro',
    category: 'Téléphone',
    description: 'iPhone 15 Pro gris sidéral, écran fissuré, étui transparent',
    location: 'Centre commercial Beaugrenelle, Paris',
    date: '30 avril 2025',
    status: 'returned' as const,
    image: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'Sac à main rouge',
    category: 'Sac/Bagages',
    description: 'Sac à main en cuir rouge avec une bandoulière dorée et une pochette intérieure',
    location: 'Métro ligne 1, Paris',
    date: '29 avril 2025',
    status: 'lost' as const,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

const Search = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recherche avancée</h1>
        <p className="text-muted-foreground">Recherchez des objets perdus ou trouvés avec des critères précis</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AdvancedSearch />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Résultats de recherche</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

export default Search;
