
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar collapsed={collapsed} />
      
      <div className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
