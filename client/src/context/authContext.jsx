import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const getCookieOptions = () => ({
  expires: 1,
  path: "/",
  sameSite: "lax",
  secure: window.location.protocol === "https:",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (!token) {
      Cookies.remove("user", { path: "/" });
      setUser(null);
      setLoading(false);
      return;
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user cookie", err);
        setUser({ loggedIn: true });
      }
    } else {
      setUser({ loggedIn: true });
    }

    setLoading(false);
  }, []);

  const login = (token, userData) => {
    const options = getCookieOptions();
    Cookies.set("token", token, options);
    if (userData) {
      Cookies.set("user", JSON.stringify(userData), options);
      setUser(userData);
    } else {
      setUser({ loggedIn: true });
    }
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
