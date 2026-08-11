import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (userData) => {
    setUser(userData);
  };

  const login = (userData) => {
    console.log("in AuthContext", userData);
    setUser(userData);
  };

  const updateProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...profileData,
    }));
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
