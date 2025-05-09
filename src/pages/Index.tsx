
import React from 'react';
import { 
  AlertCircle, 
  Package, 
  Map, 
  ChevronRight,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bienvenue sur Win-Finder</h1>
        <p className="text-muted-foreground">Tableau de bord de gestion des objets perdus et trouvés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Package className="mr-2 h-5 w-5 text-lostfound-orange" />
              Gestion des objets
            </CardTitle>
            <CardDescription>Déclarer et gérer des objets</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Déclarez de nouveaux objets trouvés ou perdus, consultez les objets existants et mettez à jour leur statut.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <a href="/objects" className="flex items-center">
                Accéder aux objets <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Search className="mr-2 h-5 w-5 text-lostfound-blue" />
              Recherche avancée
            </CardTitle>
            <CardDescription>Filtrer et trouver des objets</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Utilisez nos outils de recherche avancée pour trouver des objets spécifiques par catégorie, lieu ou date.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <a href="/search" className="flex items-center">
                Rechercher <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Map className="mr-2 h-5 w-5 text-green-600" />
              Carte interactive
            </CardTitle>
            <CardDescription>Visualiser les objets sur une carte</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Consultez la carte interactive pour voir les emplacements des objets perdus et trouvés.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <a href="/map" className="flex items-center">
                Voir la carte <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-medium">Statistiques rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sidebar-accent rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Objets perdus</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <AlertCircle className="h-8 w-8 text-lostfound-orange opacity-80" />
            </div>
          </div>
          
          <div className="bg-sidebar-accent rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Objets trouvés</p>
                <p className="text-2xl font-bold">27</p>
              </div>
              <Package className="h-8 w-8 text-lostfound-blue opacity-80" />
            </div>
          </div>
          
          <div className="bg-sidebar-accent rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Objets restitués</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
