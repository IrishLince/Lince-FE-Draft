import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Trophy, Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock auction history data
const auctionHistory = [
  {
    id: "1",
    title: "Abstract Expressionism #45",
    artist: "Emma Johnson",
    date: "12/15/2023",
    dimensions: "24x36 inches",
    price: 1250,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "Digital Landscape Series",
    artist: "Carlos Mendez",
    date: "12/18/2023",
    dimensions: "18x24 inches",
    price: 850,
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Vintage Portrait Collection",
    artist: "Sophia Chen",
    date: "01/05/2024",
    dimensions: "16x20 inches",
    price: 2100,
    image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3"
  }
];

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: "Art collector with a passion for contemporary works. Building a diverse collection since 2015.",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  
  const getInitials = (name: string = "") => {
    if (!name) return "CU";
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Password changed successfully");
      setIsLoading(false);
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Account deleted successfully");
      setIsLoading(false);
      logout();
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  if (!user) {
    return (
      <ClientLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
            <p className="mb-4">Please log in to view your profile</p>
            <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" asChild>
              <a href="/login">Log In</a>
            </Button>
          </div>
        </div>
      </ClientLayout>
    );
  }
  
  return (
    <ClientLayout>
      {/* Header Section */}
      <div>
        <div 
          className="h-60 w-full bg-[#AA8F66]/20 relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl text-white font-medium">
                <span className="inline-flex items-center gap-3">
                  <User className="w-8 h-8 text-white/90" />
                  <span>My Profile</span>
                  <Trophy className="w-8 h-8 text-white/90" />
                </span>
              </h1>
              <p className="text-white/90 mt-3 text-base">
                View your art collection and profile
              </p>
            </div>
          </div>
        </div>
      
        <div className="container max-w-7xl mx-auto px-4 relative -mt-12">
          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            {/* Profile Card */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-[#AA8F66]/20 transition-all duration-300">
                {/* Profile Picture Section */}
                <div className="relative bg-gradient-to-br from-[#AA8F66]/10 to-[#5A3A31]/10 p-6 flex flex-col items-center">
                  <div className="absolute inset-0 opacity-10"></div>
                  
                  <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white/80 relative mb-4">
                    <Avatar className="w-full h-full">
                      <AvatarFallback className="bg-gradient-to-br from-[#AA8F66] to-[#AA8F66]/80 text-white text-5xl font-medium">
                        {getInitials(user?.name || "Customer User")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                {/* Profile Info Section */}
                <div className="p-6 bg-card rounded-b-2xl">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-1">
                      {user?.name || user?.username}
                    </h1>
                    <p className="text-muted-foreground text-sm mb-3">@{user?.username}</p>
                    <div className="inline-flex items-center justify-center px-3 py-1 mb-3 text-xs font-medium rounded-full bg-[#AA8F66]/10 text-[#AA8F66] border border-[#AA8F66]/20">
                      {user?.role || "CUSTOMER"}
                    </div>
                    <p className="text-muted-foreground text-center text-sm mb-4">{profileData.bio}</p>
                  </div>
                  
                
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              {/* Navigation Tabs */}
              <div className="bg-card rounded-xl shadow-lg border border-[#AA8F66]/20 mb-6 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full h-auto p-0 bg-transparent rounded-none border-b">
                    <TabsTrigger 
                      value="profile"
                      className="flex items-center gap-2 rounded-none py-4 h-auto border-b-2 data-[state=active]:border-[#AA8F66] data-[state=active]:shadow-none data-[state=active]:bg-[#AA8F66]/10"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="auction-history"
                      className="flex items-center gap-2 rounded-none py-4 h-auto border-b-2 data-[state=active]:border-[#AA8F66] data-[state=active]:shadow-none data-[state=active]:bg-[#AA8F66]/10"
                    >
                      <Trophy className="h-4 w-4" />
                      Won History
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security"
                      className="flex items-center gap-2 rounded-none py-4 h-auto border-b-2 data-[state=active]:border-[#AA8F66] data-[state=active]:shadow-none data-[state=active]:bg-[#AA8F66]/10"
                    >
                      <Shield className="h-4 w-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                
                  {/* Profile Tab Content */}
                  <TabsContent value="profile" className="p-6 focus:outline-none">
                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Account Information</CardTitle>
                          <CardDescription>Update your personal details here</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                  id="username"
                                  name="username"
                                  value={profileData.username}
                                  onChange={handleProfileInputChange}
                                  className="border-2 focus:border-[#AA8F66]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={profileData.name}
                                  onChange={handleProfileInputChange}
                                  className="border-2 focus:border-[#AA8F66]"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleProfileInputChange}
                                className="border-2 focus:border-[#AA8F66]"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                id="bio"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleProfileInputChange}
                                rows={4}
                                className="border-2 focus:border-[#AA8F66]"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleProfileInputChange}
                                className="border-2 focus:border-[#AA8F66]"
                              />
                            </div>
                            
                            <div>
                              <Button 
                                className="w-full bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" 
                                type="submit" 
                                disabled={isLoading}
                              >
                                {isLoading ? "Updating..." : "Update Profile"}
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Auction History Tab Content */}
                  <TabsContent value="auction-history" className="p-6 focus:outline-none">
                    <div>
                      <div className="space-y-6">
                        <div className="flex items-center mb-4">
                          <Trophy className="h-6 w-6 mr-2 text-[#AA8F66]" />
                          <h2 className="text-2xl font-bold">Won History</h2>
                        </div>
                        
                        {auctionHistory.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gradient-to-r from-[#AA8F66]/5 to-[#5A3A31]/5 rounded-xl border border-[#AA8F66]/20 shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-40 h-40 bg-gray-100 flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://placehold.co/200x200/e9e3dd/aa8f66?text=Artwork";
                                  }}
                                />
                              </div>
                              <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row justify-between">
                                <div>
                                  <h3 className="text-xl font-bold">{item.title}</h3>
                                  <p className="text-muted-foreground">by {item.artist}</p>
                                  <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Date Won</p>
                                      <p>{item.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Dimensions</p>
                                      <p>{item.dimensions}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                                  <span className="text-xl font-bold">${item.price.toLocaleString()}</span>
                                  <Button 
                                    variant="outline" 
                                    className="mt-4 border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10"
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Security Tab Content */}
                  <TabsContent value="security" className="p-6 focus:outline-none">
                    <div>
                      <div className="flex items-center mb-6">
                        <Shield className="h-6 w-6 mr-2 text-[#AA8F66]" />
                        <h2 className="text-2xl font-bold">Security Settings</h2>
                      </div>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Change Password</CardTitle>
                          <CardDescription>Ensure your account remains secure by updating your password regularly</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <div className="relative">
                                <Input 
                                  id="current-password" 
                                  type="password" 
                                  required 
                                  className="pl-10 border-2 focus:border-[#AA8F66]"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AA8F66]" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <div className="relative">
                                <Input 
                                  id="new-password" 
                                  type="password" 
                                  required 
                                  className="pl-10 border-2 focus:border-[#AA8F66]"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AA8F66]" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input id="confirm-password" type="password" required className="border-2 focus:border-[#AA8F66]" />
                            </div>
                            <div>
                              <Button 
                                type="submit" 
                                className="w-full bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white"
                                disabled={isLoading}
                              >
                                {isLoading ? "Updating..." : "Update Password"}
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-red-200">
                        <CardHeader className="text-red-800">
                          <CardTitle>Delete Account</CardTitle>
                          <CardDescription className="text-red-700">Permanently remove your account and all associated data</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" className="w-full">Delete Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                  {isLoading ? "Deleting..." : "Delete Account"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}