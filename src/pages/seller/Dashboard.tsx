import { useAuth } from "@/lib/auth-context";
import SellerLayout from "@/components/Layout/SellerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PackageOpen, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Sample metrics for the dashboard
  const metrics = {
    totalSales: 5250,
    totalBidders: 28,
    activeAuctions: 3
  };
  
  if (!user) {
    return (
      <SellerLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
            <p className="mb-4">Please log in to access your seller dashboard</p>
            <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" asChild>
              <a href="/login">Log In</a>
            </Button>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's an overview of your auctions.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#AA8F66]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bidders</CardTitle>
              <Users className="h-4 w-4 text-[#AA8F66]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalBidders}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <PackageOpen className="h-4 w-4 text-[#AA8F66]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeAuctions}</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Seller Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Seller Overview</CardTitle>
            <CardDescription>
              Your seller account summary and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarFallback className="bg-[#AA8F66] text-white text-xl">
                    {user.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "SU"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Account Type</h4>
                  <div className="text-sm flex items-center gap-2">
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-[#AA8F66]/10 text-[#AA8F66] border border-[#AA8F66]/20">
                      Verified Seller
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Member Since</h4>
                  <p className="text-sm">January 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
}