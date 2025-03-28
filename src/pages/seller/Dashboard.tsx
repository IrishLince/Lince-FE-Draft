import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  TrendingUp,
  ListChecks, 
  CreditCard, 
  Bell,
} from 'lucide-react';
import TransactionPayment from '../../components/TransactionPayment';
import SellerLayout from '@/components/Layout/SellerLayout';

const mockSellerData = {
  pendingItems: [
    { item_id: 1, name: 'Vintage Watch', category: 'Accessories', status: 'PENDING' },
    { item_id: 2, name: 'Rare Book Collection', category: 'Books', status: 'PENDING' }
  ],
  activeItems: [
    { item_id: 3, name: 'Antique Vase', category: 'Collectibles', currentBid: 250, endTime: '2024-04-15T18:00:00' },
    { item_id: 4, name: 'Vintage Guitar', category: 'Music', currentBid: 1500, endTime: '2024-04-20T20:00:00' }
  ],
  notifications: [
    { id: 1, message: 'New bid on Vintage Guitar', time: '2 hours ago' },
    { id: 2, message: 'Auction for Antique Vase ending soon', time: '4 hours ago' }
  ]
};

const mockMarketData = {
  topCategories: [
    { 
      name: 'Vintage Watches', 
      totalListings: 156, 
      averageBid: 1250, 
      growth: 18.5 
    },
    { 
      name: 'Collectible Art', 
      totalListings: 112, 
      averageBid: 3500, 
      growth: 22.3 
    },
    { 
      name: 'Classic Automobiles', 
      totalListings: 45, 
      averageBid: 25000, 
      growth: 15.7 
    }
  ],
  bidTrends: [
    { 
      category: 'Electronics', 
      monthlyAvgBids: 78, 
      avgBidIncrease: 12.4 
    },
    { 
      category: 'Vintage Memorabilia', 
      monthlyAvgBids: 45, 
      avgBidIncrease: 8.9 
    }
  ],
  platformOverview: {
    totalActiveListings: 1245,
    totalMonthlyBids: 3678,
    averageListingPrice: 1750
  }
};

const handleCancelItem = (itemId) => {
  const confirmCancel = window.confirm('Are you sure you want to cancel this item?');
  if (confirmCancel) {
    mockSellerData.pendingItems = mockSellerData.pendingItems.filter((item) => item.item_id !== itemId);
    mockSellerData.activeItems = mockSellerData.activeItems.filter((item) => item.item_id !== itemId);
    alert('Item has been canceled successfully.');
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="flex flex-col gap-6 mt-8">
            {/* Notifications */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
                <Bell className="mr-3 text-[#AA8F66]" /> Notifications
              </h3>
              {mockSellerData.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors"
                >
                  <p className="font-semibold text-[#5A3A31]">
                    {notification.message}
                  </p>
                  <p className="text-sm text-[#5A3A31]/70">{notification.time}</p>
                </div>
              ))}
            </div>
            {/* Pending Items */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
                <Package className="mr-3 text-[#AA8F66]" /> Pending Items
              </h3>
              {mockSellerData.pendingItems.map((item) => (
                <div
                  key={item.item_id}
                  className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-[#5A3A31]">{item.name}</p>
                    <p className="text-sm text-[#5A3A31]/70">{item.category}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                  >
                    Pending
                  </span>
                </div>
              ))}
            </div>

            {/* Active Auctions */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
                <ListChecks className="mr-3 text-[#AA8F66]" /> Active Auctions
              </h3>
              {mockSellerData.activeItems.map((item) => (
                <div
                  key={item.item_id}
                  className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-[#5A3A31]">{item.name}</p>
                    <p className="text-sm text-[#5A3A31]/70">
                      Current Bid: ${item.currentBid}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                  >
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'market-insights':
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mt-8">
            <h2 className="text-4xl font-extrabold mb-8 flex items-center bg-gradient-to-r from-[#5A3A31] to-[#AA8F66] bg-clip-text text-transparent">
              <TrendingUp className="mr-4" /> Market Insights
            </h2>
    
            {/* Platform Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { 
                  label: 'Active Listings', 
                  value: mockMarketData.platformOverview.totalActiveListings,
                  icon: Package,
                  color: 'bg-[#AA8F66]/10 text-[#5A3A31]'
                },
                { 
                  label: 'Monthly Bids', 
                  value: mockMarketData.platformOverview.totalMonthlyBids,
                  icon: ListChecks,
                  color: 'bg-[#AA8F66]/20 text-[#5A3A31]'
                },
                { 
                  label: 'Avg Listing Price', 
                  value: `$${mockMarketData.platformOverview.averageListingPrice}`,
                  icon: CreditCard,
                  color: 'bg-[#AA8F66]/30 text-[#5A3A31]'
                }
              ].map((stat) => (
                <div 
                  key={stat.label} 
                  className={`p-6 rounded-2xl shadow-md flex items-center ${stat.color}`}
                >
                  <stat.icon className="mr-4 w-10 h-10" />
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
    
            {/* Top Categories */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-[#5A3A31]">Top Performing Categories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {mockMarketData.topCategories.map((category) => (
                  <div 
                    key={category.name} 
                    className="bg-[#AA8F66]/10 p-6 rounded-2xl hover:shadow-md transition-all"
                  >
                    <h4 className="text-xl font-bold mb-4 text-[#5A3A31]">{category.name}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#5A3A31]/70">Total Listings</span>
                        <span className="font-semibold text-[#5A3A31]">{category.totalListings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A3A31]/70">Avg Bid</span>
                        <span className="font-semibold text-[#5A3A31]">${category.averageBid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A3A31]/70">Growth</span>
                        <span className={`font-semibold ${
                          category.growth > 0 ? 'text-[#AA8F66]' : 'text-[#110407]'
                        }`}>
                          {category.growth > 0 ? '+' : ''}{category.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Bidding Trends */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#5A3A31]">Bidding Trends</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockMarketData.bidTrends.map((trend) => (
                  <div 
                    key={trend.category} 
                    className="bg-[#AA8F66]/10 p-6 rounded-2xl hover:shadow-md transition-all"
                  >
                    <h4 className="text-xl font-bold mb-4 text-[#5A3A31]">{trend.category}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#5A3A31]/70">Monthly Avg Bids</span>
                        <span className="font-semibold text-[#5A3A31]">{trend.monthlyAvgBids}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A3A31]/70">Bid Increase</span>
                        <span className={`font-semibold ${
                          trend.avgBidIncrease > 0 ? 'text-[#AA8F66]' : 'text-[#110407]'
                        }`}>
                          {trend.avgBidIncrease > 0 ? '+' : ''}{trend.avgBidIncrease}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'my-items':
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mt-8">
            <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#5A3A31] to-[#AA8F66] bg-clip-text text-transparent">
              My Listed Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl overflow-hidden">
                <thead className="bg-[#AA8F66]/10">
                  <tr>
                    {['Item Name', 'Category', 'Status', 'Current Bid', 'Actions'].map((header) => (
                      <th key={header} className="p-4 text-left text-[#5A3A31] font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...mockSellerData.pendingItems, ...mockSellerData.activeItems].map((item) => (
                    <tr key={item.item_id} className="border-b hover:bg-[#AA8F66]/10 transition-colors">
                      <td className="p-4 font-semibold text-[#5A3A31]">{item.name}</td>
                      <td className="p-4 text-[#5A3A31]/70">{item.category}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            'status' in item && item.status === 'PENDING' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {'status' in item ? item.status : 'ACTIVE'}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[#5A3A31]">${'currentBid' in item ? item.currentBid : 'N/A'}</td>
                      <td className="p-4">
                        <button
                          className="bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors font-medium"
                          onClick={() => handleCancelItem(item.item_id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'transaction-payment':
        return <TransactionPayment />;
      default:
        return null;
    }
  };

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gradient-to-br from-white to-[#AA8F66]/5">
        <div className="container mx-auto pb-16">
          {renderDashboardContent()}
        </div>
      </div>
    </SellerLayout>
  );
};

export default Dashboard;