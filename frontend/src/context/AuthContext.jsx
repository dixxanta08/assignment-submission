import { createContext, useEffect, useState } from "react";
import { authService } from "../services/auth-service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const fetchLoggedInUser = async () => {
    try {
      const userData = await authService.fetchMe();
      setLoggedInUser(userData.user);
    } catch (error) {
      console.error("Failed to fetch logged-in user:", error);
      await logout();
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const login = async ({ email, password }) => {
    const response = await authService.login(email, password);
    setLoggedInUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
