import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "@/lib/auth-context";
import { 
  LayoutDashboard, 
  Package,
  CreditCard,
  User,
  Shield
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const getInitials = (name: string = "") => {
    if (!name) return "SU";
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Use the Navbar component */}
      <Navbar />
      
      {/* Main Content - Add pt-16 to account for the fixed navbar height */}
      <div className="pt-16">
        <div 
          className="bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=70')",
            height: "100px"
          }}
        >
          <div className="bg-black/30 absolute left-0 right-0 h-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative -mt-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-8 overflow-x-auto pb-2">
              <Link 
                  to="/seller/profile" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    (isActive("/seller/profile") && !location.pathname.includes("/payment") && !location.pathname.includes("/security")) ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/seller/profile/payment" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive("/seller/profile/payment") ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Details</span>
                </Link>
                <Link 
                  to="/seller/profile/security" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive("/seller/profile/security") ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </Link>
                <Link 
                  to="/seller/dashboard" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive("/seller/dashboard") ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/seller/my-auctions" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive("/seller/my-auctions") ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>My Auctions</span>
                </Link>
                <Link 
                  to="/seller/transactions" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive("/seller/transactions") ? "text-[#AA8F66] font-medium" : "text-[#5A3A31] hover:bg-[#f8f8f8]"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Transaction Payment</span>
                </Link>
                
              </div>
            </div>
          </div>
          
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;