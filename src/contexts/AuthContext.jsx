import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a context for authentication
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // On component mount, check if the user is authenticated based on backend token validation
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make an authenticated request to check the user's session
        const response = await axios.get(
          "https://zzzemina-api.vercel.app/api/auth/status",
          {
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Set user data if response is valid
        }
      } catch (error) {
        console.log("Cannot get authentication status",error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus(); // Trigger the check on mount
  }, []);

  // Login function to set user and authentication state
  const login = (userData) => {
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  // Logout function to reset state
  const logout = async () => {
    try {
      // Call the backend to clear the httpOnly authToken cookie
      await axios.post(
        "https://zzzemina-api.vercel.app/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Reset state in frontend
      setUser(null);
      setIsAuthenticated(false);

      // Remove the user and authToken from client-side cookies (non-httpOnly)
      Cookies.remove("user");
      Cookies.remove("authToken");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
