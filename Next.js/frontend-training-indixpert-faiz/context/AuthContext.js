"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS } from "@/constants";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load from localStorage after mount (prevents SSR hydration mismatch & cascading render)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);

        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to load auth state from storage:", err);
      } finally {
        setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const login = useCallback((newToken, userData) => {
    if (newToken) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, newToken);
      setToken(newToken);
    }
    if (userData) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    router.replace("/signin");
  }, [router]);

  // Sync logout across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_STORAGE_KEYS.TOKEN && !e.newValue) {
        setToken(null);
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
