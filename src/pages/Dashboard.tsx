import React, { useState, useEffect } from 'react';
import { 
  ClipboardList,
  MessageSquare, 
  Calendar, 
  Users, 
  ArrowUpRight,
  Plus,
  RefreshCw
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import MapDisplay from '@/components/dashboard/MapDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [mapLocations, setMapLocations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    declared: { value: 0, percentage: 0, positive: true },
    found: { value: 0, percentage: 0, positive: true },
    pending: { value: 0, percentage: 0, positive: false },
    messages: { value: 0, percentage: 0, positive: true },
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      
      // Artificial delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample data - in a real app, these would come from an API
      setActivities([
        { 
          id: 1, 
          type: 'lost' as const, 
          item: 'Portefeuille noir', 
          location: 'Avenue Habib Bourguiba, Tunis', 
          date: '2 mai 2025', 
          category: 'Portefeuille'
        },
        { 
          id: 2, 
          type: 'found' as const, 
          item: 'Clés avec porte-clés bleu', 
          location: 'Parc Belvédère, Tunis', 
          date: '1 mai 2025', 
          category: 'Clés'
        },
        { 
          id: 3, 
          type: 'returned' as const, 
          item: 'iPhone 15 Pro', 
          location: 'Tunisia Mall, Lac 2, Tunis', 
          date: '30 avril 2025', 
          category: 'Téléphone'
        },
        { 
          id: 4, 
          type: 'lost' as const, 
          item: 'Sac à main rouge', 
          location: 'Métro ligne 1, Tunis', 
          date: '29 avril 2025', 
          category: 'Sac/Bagages'
        },
      ]);

      setMapLocations([
        {
          id: 1,
          type: 'lost' as const,
          item: 'Portefeuille noir',
          description: 'Portefeuille en cuir noir avec carte d\'identité et carte bancaire',
          lat: 48.8453,
          lng: 2.3752,
          date: '2 mai 2025'
        },
        {
          id: 2,
          type: 'found' as const,
          item: 'Clés avec porte-clés bleu',
          description: 'Trousseau de 3 clés avec un porte-clés dauphin bleu',
          lat: 48.8763,
          lng: 2.3824,
          date: '1 mai 2025'
        },
        {
          id: 3,
          type: 'found' as const,
          item: 'iPhone 15 Pro',
          description: 'iPhone 15 Pro gris sidéral, écran fissuré',
          lat: 48.8511,
          lng: 2.2857,
          date: '30 avril 2025'
        },
        {
          id: 4,
          type: 'lost' as const,
          item: 'Sac à main rouge',
          description: 'Sac à main en cuir rouge avec une bandoulière dorée',
          lat: 48.8606,
          lng: 2.3376,
          date: '29 avril 2025'
        },
      ]);

      setStats({
        declared: { value: 124, percentage: 8, positive: true },
        found: { value: 53, percentage: 12, positive: true },
        pending: { value: 71, percentage: 3, positive: false },
        messages: { value: 28, percentage: 24, positive: true },
      });
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate data refresh
    setTimeout(() => {
      // Slightly modify stats to show change
      setStats(prev => ({
        declared: { 
          value: prev.declared.value + Math.floor(Math.random() * 5), 
          percentage: prev.declared.percentage + 1, 
          positive: true 
        },
        found: { 
          value: prev.found.value + Math.floor(Math.random() * 3), 
          percentage: prev.found.percentage + 2, 
          positive: true 
        },
        pending: { 
          value: prev.pending.value - Math.floor(Math.random() * 2), 
          percentage: 2, 
          positive: true 
        },
        messages: { 
          value: prev.messages.value + Math.floor(Math.random() * 4), 
          percentage: prev.messages.percentage + 3, 
          positive: true 
        },
      }));
      
      setIsLoading(false);
      
      toast({
        title: "Données actualisées",
        description: "Tableau de bord mis à jour avec les dernières informations.",
      });
    }, 1000);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Aperçu et gestion des objets perdus et trouvés</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Chargement...' : 'Actualiser'}
          </Button>
          
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2 p-6 border rounded-lg">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Objets déclarés"
              value={stats.declared.value.toString()}
              icon={ClipboardList}
              iconColor="bg-blue-100 text-blue-600"
              percentage={stats.declared.percentage}
              positive={stats.declared.positive}
            />
            <StatsCard
              title="Objets trouvés"
              value={stats.found.value.toString()}
              icon={Users}
              iconColor="bg-green-100 text-green-600"
              percentage={stats.found.percentage}
              positive={stats.found.positive}
            />
            <StatsCard
              title="En attente"
              value={stats.pending.value.toString()}
              icon={Calendar}
              iconColor="bg-orange-100 text-lostfound-orange"
              percentage={stats.pending.percentage}
              positive={stats.pending.positive}
            />
            <StatsCard
              title="Messages"
              value={stats.messages.value.toString()}
              icon={MessageSquare}
              iconColor="bg-purple-100 text-purple-600"
              percentage={stats.messages.percentage}
              positive={stats.messages.positive}
            />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-[400px]" />
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Map */}
            <MapDisplay locations={mapLocations} />
            
            {/* Recent Activity */}
            <RecentActivityCard activities={activities} />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          
       
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5"
            onClick={() => toast({ title: "Messages", description: "Accès aux messages non lus." })}
          >
            <MessageSquare className="h-6 w-6" />
            <span>Messages non lus</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5"
            onClick={() => toast({ title: "Rapports", description: "Accès aux rapports et statistiques." })}
          >
            <ArrowUpRight className="h-6 w-6" />
            <span>Rapports et statistiques</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
