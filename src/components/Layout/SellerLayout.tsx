import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import SellerSidebar from './SellerSidebar';
import Navbar from '@/components/Navbar';

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/seller/dashboard':
        return 'Seller Dashboard';
      case '/seller/auctions':
        return 'My Auctions';
      case '/seller/create-auction':
        return 'Create New Auction';
      case '/seller/analytics':
        return 'Analytics';
      case '/seller/customers':
        return 'Customers';
      case '/seller/reports':
        return 'Reports';
      case '/seller/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SellerSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <Navbar />
      
      <main 
        className={`pt-16 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-0 md:ml-64'
        }`}
      >
        <div className="p-4 md:p-6 lg:p-8 animate-in fade-in">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-[#5A3A31]">{getPageTitle()}</h1>
            <p className="text-[#5A3A31]/70 mt-1">Manage your auctions and seller account</p>
          </div>
          
          <div className="animate-in slide-in-from-right duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerLayout; 