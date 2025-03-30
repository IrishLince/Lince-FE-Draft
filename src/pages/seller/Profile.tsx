import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import SellerLayout from "@/components/Layout/SellerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Lock, CreditCard } from "lucide-react";

export default function SellerProfile() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active page based on URL path
  const getActivePageFromPath = () => {
    if (location.pathname.includes('/payment')) return "payment";
    if (location.pathname.includes('/security')) return "security";
    return "profile";
  };
  
  const [activePage, setActivePage] = useState(getActivePageFromPath());
  const [isLoading, setIsLoading] = useState(false);
  
  // Update active page when location changes
  useEffect(() => {
    setActivePage(getActivePageFromPath());
  }, [location.pathname]);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: "Professional art seller specializing in contemporary and abstract works. Established gallery owner since 2015.",
    phone: "",
    companyName: "Art Gallery Studio",
    paymentDetails: {
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    }
  });
  
  const getInitials = (name: string = "") => {
    if (!name) return "SU";
    
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
      <SellerLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
            <p className="mb-4">Please log in to view your profile</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-[#AA8F66] text-white text-4xl font-medium">
                    {getInitials(user?.name || "Seller User")}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {user?.name || "Seller User"}
              </h2>
              <p className="text-sm text-gray-500 mb-3">@{user?.username || "seller"}</p>
              
              <div className="inline-flex items-center justify-center px-3 py-1 mb-3 text-xs font-medium rounded-full bg-[#AA8F66]/10 text-[#AA8F66] border border-[#AA8F66]/20">
                Verified Seller
              </div>
              
              <p className="text-sm text-gray-600 mt-2 mb-4">
                {profileData.bio}
              </p>
              
              <div className="w-full mt-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Company:</span>
                  <span className="text-sm font-medium text-gray-800">{profileData.companyName}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-6 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            {activePage === "profile" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-700">Company/Gallery Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={profileData.companyName}
                      onChange={handleProfileInputChange}
                      className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-gray-700">Business Bio/Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileInputChange}
                      rows={4}
                      className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
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
              </div>
            )}
            
            {activePage === "payment" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDetails.bankName" className="text-gray-700">Bank Name</Label>
                    <Input
                      id="paymentDetails.bankName"
                      name="paymentDetails.bankName"
                      value={profileData.paymentDetails.bankName}
                      onChange={handleProfileInputChange}
                      className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="paymentDetails.accountNumber" className="text-gray-700">Account Number</Label>
                      <Input
                        id="paymentDetails.accountNumber"
                        name="paymentDetails.accountNumber"
                        value={profileData.paymentDetails.accountNumber}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentDetails.routingNumber" className="text-gray-700">Routing Number</Label>
                      <Input
                        id="paymentDetails.routingNumber"
                        name="paymentDetails.routingNumber"
                        value={profileData.paymentDetails.routingNumber}
                        onChange={handleProfileInputChange}
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Payment History</h4>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left p-4 text-gray-700 font-medium">Date</th>
                            <th className="text-left p-4 text-gray-700 font-medium">Amount</th>
                            <th className="text-left p-4 text-gray-700 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="p-4">01/15/2024</td>
                            <td className="p-4 text-[#3A5A31]">$1,250.00</td>
                            <td className="p-4 text-green-600">Completed</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="p-4">12/22/2023</td>
                            <td className="p-4 text-[#3A5A31]">$850.00</td>
                            <td className="p-4 text-green-600">Completed</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="p-4">11/30/2023</td>
                            <td className="p-4 text-[#3A5A31]">$2,100.00</td>
                            <td className="p-4 text-green-600">Completed</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white mt-4" 
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Payment Information"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {activePage === "security" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Security Settings</h3>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h4>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-gray-700">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="current-password" 
                          type="password" 
                          required 
                          className="pl-10 border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AA8F66]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-700">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="new-password" 
                          type="password" 
                          required 
                          className="pl-10 border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AA8F66]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-700">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        required 
                        className="border-gray-200 focus:border-[#AA8F66] focus:ring-[#AA8F66]" 
                      />
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
                </div>
                
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                  <h4 className="text-lg font-semibold text-red-700 mb-2">Delete Account</h4>
                  <p className="text-red-600 text-sm mb-4">
                    This action cannot be undone. This will permanently delete your seller account, remove all your listings, and all your data from our servers.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleDeleteAccount}
                  >
                    Delete Seller Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}