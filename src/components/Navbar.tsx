import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, User } from 'lucide-react';
import { Input } from './ui/input';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { toast } from './ui/use-toast';
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isSeller } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Finding results for "${searchQuery}"`,
      });
      
      // Navigate to auctions page with search query
      navigate(`/auctions?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const performSearch = (value: string) => {
    setIsSearchOpen(false);
    if (value) {
      navigate(`/auctions?search=${encodeURIComponent(value)}`);
      toast({
        title: "Search results",
        description: `Showing results for "${value}"`,
      });
    }
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const getInitials = (name: string) => {
    if (!name) return "";
    
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-subtle py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
          Art<span className="text-[#AA8F66]">Auction</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'text-[#AA8F66] after:w-full' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/auctions" 
            className={`nav-link ${location.pathname === '/auctions' ? 'text-[#AA8F66] after:w-full' : ''}`}
          >
            Auctions
          </Link>
          <Link 
            to="/artists" 
            className={`nav-link ${location.pathname.startsWith('/artist') ? 'text-[#AA8F66] after:w-full' : ''}`}
          >
            Artists
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'text-[#AA8F66] after:w-full' : ''}`}
          >
            About
          </Link>
          {user && isSeller && (
            <Link 
              to="/seller/dashboard" 
              className={`nav-link ${location.pathname.startsWith('/seller') ? 'text-[#AA8F66] after:w-full' : ''}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-[#AA8F66]/10 transition-colors"
          >
            <Search size={20} className="text-[#5A3A31]" />
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {!isSeller && (
                  <DropdownMenuItem asChild>
                    <Link to="/seller-application">Become a Seller</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
                Art<span className="text-[#AA8F66]">Auction</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <X size={24} className="text-[#5A3A31]" />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="block p-2 hover:bg-[#AA8F66]/10 rounded-lg"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/auctions" 
                    className="block p-2 hover:bg-[#AA8F66]/10 rounded-lg"
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/artists" 
                    className="block p-2 hover:bg-[#AA8F66]/10 rounded-lg"
                  >
                    Artists
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="block p-2 hover:bg-[#AA8F66]/10 rounded-lg"
                  >
                    About
                  </Link>
                </li>
                {user && isSeller && (
                  <li>
                    <Link 
                      to="/seller/dashboard" 
                      className="block p-2 hover:bg-[#AA8F66]/10 rounded-lg"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search artworks and artists..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => performSearch(searchQuery)}>
              <Search className="mr-2 h-4 w-4" />
              Search for "{searchQuery}"
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;