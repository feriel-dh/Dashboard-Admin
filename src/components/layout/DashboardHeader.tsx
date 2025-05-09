
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Recherche rapide..." 
            className="pl-8 py-2"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-lostfound-orange rounded-full"></span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@lostfound.com</p>
          </div>
          
          <Avatar>
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback className="bg-lostfound-blue text-white">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
