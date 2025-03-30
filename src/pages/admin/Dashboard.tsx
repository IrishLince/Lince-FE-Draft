import React, { useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  PanelTop,
  LucideIcon,
  ArrowUpRight,
  ChevronRight,
  BarChart3,
  Activity
} from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  subValue?: string;
  colorClass: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const AdminDashboard = () => {
  // Mock data (would be replaced with actual backend data)
  const [dashboardData, setDashboardData] = useState({
    // Users Section
    totalUsers: 1254,
    newUsersThisMonth: 87,
    activeUsers: 976,
    inactiveUsers: 278,

    // Items Section
    totalItems: 678,
    pendingItems: 45,
    activeItems: 523,
    soldItems: 110,

    // Seller Applications
    totalSellerApplications: 62,
    pendingSellerApplications: 24,
    approvedSellerApplications: 35,
    rejectedSellerApplications: 3,

    // Auction Approvals
    totalAuctions: 213,
    pendingAuctions: 37,
    activeAuctions: 156,
    completedAuctions: 20
  });

  // Card Component for Dashboard Sections
  const DashboardCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subValue, 
    colorClass, 
    trend, 
    trendValue 
  }: DashboardCardProps) => (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
      <div className={`absolute top-0 left-0 w-1.5 h-full ${colorClass}`}></div>
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 rounded-bl-full bg-black -mr-10 -mt-10 group-hover:opacity-10 transition-opacity"></div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-1 right-3 w-20 h-10">
        <svg width="100%" height="100%" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-3">
          <path d="M0 50 L20 30 L40 35 L60 15 L80 25 L100 0" stroke={colorClass.replace('bg-', '')} strokeWidth="2" strokeOpacity="0.2" fill="none" />
        </svg>
      </div>
      
      <CardContent className="pt-6 pb-6 pl-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-opacity-15 relative overflow-hidden group-hover:scale-110 transition-transform`} 
                 style={{backgroundColor: `${colorClass.replace('bg-', '')}/10`}}>
              <div className="absolute inset-0 bg-gradient-to-br opacity-20" 
                   style={{backgroundImage: `linear-gradient(to bottom right, ${colorClass.replace('bg-', '')}, transparent)`}}></div>
              <Icon className="relative z-10" style={{color: colorClass.replace('bg-', '')}} size={22} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#5A3A31]/70">{title}</h3>
              <p className="text-2xl font-bold text-[#5A3A31]">{value.toLocaleString()}</p>
              {subValue && <p className="text-xs mt-1 text-[#AA8F66]">{subValue}</p>}
            </div>
          </div>
          
          {trend && (
            <div className={`flex items-center text-xs font-medium px-2.5 py-1.5 rounded-full ${
              trend === 'up' ? 'bg-green-100 text-green-600' : 
              trend === 'down' ? 'bg-red-100 text-red-600' : 
              'bg-gray-100 text-gray-600'
            } shadow-sm`}>
              {trend === 'up' && <ArrowUpRight size={12} className="mr-1" />}
              {trend === 'down' && <ArrowUpRight size={12} className="mr-1 rotate-180" />}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Section Header Component
  const SectionHeader = ({ title, action }: { title: string, action?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-[#5A3A31]/5 to-transparent p-2 pl-4 rounded-lg">
      <div className="flex items-center">
        <div className="w-1 h-6 bg-[#AA8F66] rounded mr-3"></div>
        <h2 className="text-xl font-semibold text-[#5A3A31]">{title}</h2>
      </div>
      {action && action}
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Stats Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-[#5A3A31] to-[#AA8F66] rounded-xl p-4 col-span-2 lg:col-span-4 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 text-white">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
                <p className="text-white/80 mt-1">Here's what's happening with your auction platform today.</p>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <BarChart3 size={16} className="inline-block mr-1 relative -top-px" />
                  View Reports
                </button>
                <button className="bg-white hover:bg-white/90 transition-colors rounded-lg px-4 py-2 text-sm font-medium text-[#5A3A31]">
                  <Activity size={16} className="inline-block mr-1 relative -top-px" />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Users Section */}
        <div>
          <SectionHeader 
            title="Users Overview" 
            action={
              <button className="text-sm text-[#AA8F66] hover:text-[#5A3A31] flex items-center transition-colors">
                View All Users <ChevronRight size={14} className="ml-1" />
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard 
              icon={Users} 
              title="Total Users" 
              value={dashboardData.totalUsers}
              colorClass="bg-[#5A3A31]"
              trend="up"
              trendValue="+12%"
            />
            <DashboardCard 
              icon={Users} 
              title="Active Users" 
              value={dashboardData.activeUsers}
              colorClass="bg-[#AA8F66]"
              subValue="78% of total users"
            />
            <DashboardCard 
              icon={Users} 
              title="Inactive Users" 
              value={dashboardData.inactiveUsers}
              colorClass="bg-red-500"
              subValue="Requires attention"
            />
            <DashboardCard 
              icon={Users} 
              title="New This Month" 
              value={dashboardData.newUsersThisMonth}
              colorClass="bg-blue-500"
              trend="up"
              trendValue="+8.5%"
            />
          </div>
        </div>

        {/* Items Section */}
        <div>
          <SectionHeader 
            title="Items Management" 
            action={
              <button className="text-sm text-[#AA8F66] hover:text-[#5A3A31] flex items-center transition-colors">
                View All Items <ChevronRight size={14} className="ml-1" />
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard 
              icon={ShoppingCart} 
              title="Total Items" 
              value={dashboardData.totalItems}
              colorClass="bg-[#5A3A31]"
              trend="up"
              trendValue="+24"
            />
            <DashboardCard 
              icon={Clock} 
              title="Pending Items" 
              value={dashboardData.pendingItems}
              colorClass="bg-amber-500"
              subValue="Awaiting review"
            />
            <DashboardCard 
              icon={CheckCircle} 
              title="Active Items" 
              value={dashboardData.activeItems}
              colorClass="bg-[#AA8F66]"
              trend="up"
              trendValue="+5.2%"
            />
            <DashboardCard 
              icon={ShoppingCart} 
              title="Sold Items" 
              value={dashboardData.soldItems}
              colorClass="bg-blue-500"
              subValue="Total value: $45,890"
            />
          </div>
        </div>
              
        {/* Seller Applications Section */}
        <div>
          <SectionHeader 
            title="Seller Applications" 
            action={
              <button className="text-sm text-[#AA8F66] hover:text-[#5A3A31] flex items-center transition-colors">
                View Applications <ChevronRight size={14} className="ml-1" />
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard 
              icon={FileText} 
              title="Total Applications" 
              value={dashboardData.totalSellerApplications}
              colorClass="bg-[#5A3A31]"
              trend="up"
              trendValue="+5"
            />
            <DashboardCard 
              icon={Clock} 
              title="Pending" 
              value={dashboardData.pendingSellerApplications}
              colorClass="bg-amber-500"
              subValue="Requires review"
            />
            <DashboardCard 
              icon={CheckCircle} 
              title="Approved" 
              value={dashboardData.approvedSellerApplications}
              colorClass="bg-[#AA8F66]"
              subValue="56% approval rate"
            />
            <DashboardCard 
              icon={XCircle} 
              title="Rejected" 
              value={dashboardData.rejectedSellerApplications}
              colorClass="bg-red-500"
              subValue="4.8% rejection rate"
            />
          </div>
        </div>
                    
        {/* Auction Approvals Section */}
        <div>
          <SectionHeader 
            title="Auction Management" 
            action={
              <button className="text-sm text-[#AA8F66] hover:text-[#5A3A31] flex items-center transition-colors">
                View Auctions <ChevronRight size={14} className="ml-1" />
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard 
              icon={ShoppingCart} 
              title="Total Auctions" 
              value={dashboardData.totalAuctions}
              colorClass="bg-[#5A3A31]"
              trend="up"
              trendValue="+15"
            />
            <DashboardCard 
              icon={Clock} 
              title="Pending Auctions" 
              value={dashboardData.pendingAuctions}
              colorClass="bg-amber-500"
              subValue="Awaiting approval"
            />
            <DashboardCard 
              icon={CheckCircle} 
              title="Active Auctions" 
              value={dashboardData.activeAuctions}
              colorClass="bg-[#AA8F66]"
              trend="up"
              trendValue="+8"
            />
            <DashboardCard 
              icon={PanelTop} 
              title="Completed Auctions" 
              value={dashboardData.completedAuctions}
              colorClass="bg-blue-500"
              subValue="Revenue: $238,900"
            />
          </div>
        </div>
        
        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <SectionHeader title="Recent Activity" />
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start p-3 rounded-lg hover:bg-[#F9F7F5] transition-colors">
                      <div className="h-9 w-9 rounded-full bg-[#AA8F66]/10 flex items-center justify-center mr-3">
                        {item % 2 === 0 ? 
                          <CheckCircle size={16} className="text-[#AA8F66]" /> : 
                          <Clock size={16} className="text-[#5A3A31]" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#5A3A31]">
                          {item % 2 === 0 ? 'Auction item approved' : 'New seller application received'}
                        </p>
                        <p className="text-xs text-[#5A3A31]/70">
                          {item % 2 === 0 ? 'Vintage Watch by John Doe' : 'Sarah Johnson applied to be a seller'}
                        </p>
                        <p className="text-xs text-[#5A3A31]/50 mt-1">
                          {item % 2 === 0 ? '2 hours ago' : '4 hours ago'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#AA8F66]/10 text-center">
                  <button className="text-sm text-[#AA8F66] hover:text-[#5A3A31] transition-colors">
                    View all activity
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <SectionHeader title="Quick Actions" />
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <button className="w-full p-3 bg-[#5A3A31] text-white rounded-lg hover:bg-[#5A3A31]/90 transition-colors text-sm font-medium flex justify-between items-center">
                    Review Pending Auctions
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full p-3 bg-[#AA8F66] text-white rounded-lg hover:bg-[#AA8F66]/90 transition-colors text-sm font-medium flex justify-between items-center">
                    Approve Seller Applications
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full p-3 bg-white border border-[#AA8F66]/20 text-[#5A3A31] rounded-lg hover:bg-[#F9F7F5] transition-colors text-sm font-medium flex justify-between items-center">
                    View Platform Analytics
                    <ChevronRight size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
