import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const UserContext = createContext<any>({});

// Create a provider component
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(); // State for logged-in user

  // Function to log in the user
  const login = (userData: any) => {
    setUser(userData); // Set user data directly from components
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Reset user state
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to the user context
export const useUser = () => {
  return useContext(UserContext);
};