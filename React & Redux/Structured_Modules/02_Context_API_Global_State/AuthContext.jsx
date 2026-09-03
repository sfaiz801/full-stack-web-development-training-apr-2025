import React, { createContext, useContext, useState } from 'react';

/**
 * AuthContext & ThemeContext Modular Pattern
 * Solves: Prop drilling, centralized user session & UI theme control
 */

const AuthContext = createContext(null);
const ThemeContext = createContext(null);

export function AppProviders({ children }) {
  const [user, setUser] = useState({
    id: 'USR-101',
    name: 'Mohammad Faiz',
    email: 'faiz@indixpert.com',
    role: 'Full Stack Engineer',
  });

  const [theme, setTheme] = useState('dark');

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user) }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

// Custom Hooks for safe context consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
