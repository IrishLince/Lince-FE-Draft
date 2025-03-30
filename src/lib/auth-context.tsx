import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isSeller: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Route users based on role
        routeUserBasedOnRole(parsedUser.role, location.pathname);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [location.pathname]);

  // Helper functions for role checking
  const isAdmin = () => user?.role === 'ADMIN';
  const isSeller = () => user?.role === 'SELLER' || user?.role === 'ADMIN';
  
  // Function to route users based on their role
  const routeUserBasedOnRole = (role: string, currentPath: string) => {
    // Public routes that should be accessible to all users regardless of role
    const publicRoutes = ['/', '/auctions', '/artists', '/about', '/faqs', '/artwork', '/artist'];
    
    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route + '/')
    );
    
    if (role === 'ADMIN' && !currentPath.startsWith('/admin')) {
      navigate('/admin/dashboard', { replace: true });
    } else if (role === 'SELLER' && 
              !currentPath.startsWith('/seller') && 
              !currentPath.startsWith('/admin') &&
              !isPublicRoute) {
      navigate('/seller/dashboard', { replace: true });
    } else if (role === 'CUSTOMER' && 
              (currentPath === '/login' || currentPath === '/signup')) {
      // For customers, redirect from login/signup pages to home page
      navigate('/', { replace: true });
    }
  };

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting backend login with:", emailOrUsername);
      
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: emailOrUsername, password }),
      });

      console.log("Backend login response status:", response.status);

      if (!response.ok) {
        console.error("Backend login failed with status:", response.status);
        return false;
      }

      const data = await response.json();
      console.log("Backend login response data:", data);
      
      // The backend returns {status: true, statusCode: 200, message: 'Successfully logged in.'}
      // And doesn't include user data in the response
      if (data.status === true) {
        // Since the login was successful but we don't have user data in the response,
        // we need to create a basic user object with the role based on the credentials
        let role = 'CUSTOMER';
        
        // Check if this is the admin user
        if (emailOrUsername === 'admin') {
          role = 'ADMIN';
        } else if (emailOrUsername === 'seller') {
          role = 'SELLER';
        }
        // Could add more role checks here if needed
        
        const userData: User = {
          id: "1", // Default ID
          username: emailOrUsername,
          name: emailOrUsername, // Use username as display name
          email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@example.com`,
          role: role as 'CUSTOMER' | 'SELLER' | 'ADMIN',
          createdAt: new Date().toISOString(),
        };

        console.log("Created user data with role:", role);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Redirect based on role
        if (role === 'ADMIN') {
          navigate('/admin/dashboard', { replace: true });
        } else if (role === 'SELLER') {
          // Check if user was trying to access a specific page before login
          const from = location.state?.from?.pathname || '/seller/dashboard';
          
          // If it's a valid path and not login/signup page, go there
          if (from && from !== '/login' && from !== '/signup') {
            navigate(from, { replace: true });
          } else {
            navigate('/seller/dashboard', { replace: true });
          }
        } else {
          // For CUSTOMER role, redirect to homepage
          navigate('/', { replace: true });
        }
        
        return true;
      } else {
        console.error("Login failed - invalid response format");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string, name?: string): Promise<boolean> => {
    try {
      console.log("Attempting signup with username:", username, "email:", email);
      
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName: name?.split(' ')[0] || '',
          lastName: name?.split(' ')[1] || '',
          email,
          password,
          role: "CUSTOMER" // Default role for sign up
        }),
      });

      console.log("Signup response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        return false;
      }

      console.log("Signup successful, creating user...");
      
      // Create the user directly instead of calling login again
      const userData: User = {
        id: "1", // Default ID
        username,
        name: name || username,
        email,
        role: 'CUSTOMER',
        createdAt: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Redirect to homepage after successful signup
      navigate('/', { replace: true });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, isSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 