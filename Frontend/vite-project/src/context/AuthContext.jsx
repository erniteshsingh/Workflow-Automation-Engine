import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/me",
          {
            withCredentials: true,
          },
        );

        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const register = (userData) => {
    setUser(userData);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const updateProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...profileData,
    }));
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
    } catch (error) {
      console.error("Logout API failed:", error);
      throw error;
    }
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        checkingAuth,
        register,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
