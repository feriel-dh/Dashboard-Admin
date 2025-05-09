
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ClipboardList, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
}

const DashboardSidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/' },
    { label: 'Objets', icon: ClipboardList, path: '/objects' },
    { label: 'Recherche', icon: Search, path: '/search' },
    { label: 'Carte', icon: MapPin, path: '/map' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
   

  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="font-bold text-xl">
            Win<span className="text-lostfound-orange">-</span>Finder
          </h1>
        )}
        {collapsed && (
          <div className="mx-auto">
            <span className="text-xl font-bold text-lostfound-orange">W-F</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                  location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary",
                  collapsed ? "justify-center" : "space-x-3"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <button 
          className={cn(
            "flex items-center text-sidebar-foreground transition-colors hover:text-sidebar-primary",
            collapsed ? "justify-center w-full" : "space-x-3"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
