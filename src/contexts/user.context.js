import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to set the user after successful login
  const login = (token) => {
    localStorage.setItem("token", token); // Store the token in local storage
    // You might want to decode the token here and extract user information if needed
    console.log(token);
    // Set the user state accordingly
    setUser({ /* Extract user info from the token if needed */ });
  };

  // Function to logout the user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const authContextValue = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
