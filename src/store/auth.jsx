import React, { createContext, useContext, useState, useEffect } from "react";

// Step 1: Create a context object for authentication
export const AuthContext = createContext();

// Step 2: Define AuthProvider component for authentication
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [User, setUser] = useState(null); // Initialize user state with null
  const [mentees, setMentees] = useState([]);

  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    return true; // Indicate successful token storage
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null); // Reset user state when logging out
  };

  const isLoggedIn = !!token;

  // jwt authentication of the user data
  const userauthentication = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/User', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log("user", data.userData);
      setUser(data);
    } catch (error) {
      console.log("Error in fetching user data:", error.message);
    }
  };

  // Fetch mentees from the database
  const getMentees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/data/mentees');
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setMentees(data.msg); // Set mentees state
      } else {
        throw new Error('Failed to fetch mentees');
      }
    } catch (error) {
      console.log("Failed to fetch mentees:", error);
    }
  };

  useEffect(() => {
    userauthentication();
    getMentees();
  }, [token]); // Call only when token changes

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, logoutUser, User, mentees }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 3: Define useAuth hook for accessing authentication state and methods
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
