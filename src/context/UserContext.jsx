import { createContext, useState,useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const clearUserDetails = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, fetchUserDetails, clearUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
