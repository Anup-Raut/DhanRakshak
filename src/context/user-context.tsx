'use client';

import { createContext, useState, useContext, type ReactNode } from 'react';

type UserContextType = {
  userName: string;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  learningProgress: Record<string, number>;
  updateLearningProgress: (slug: string, percentage: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [learningProgress, setLearningProgress] = useState<Record<string, number>>({});

  const login = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    // Reset progress on new login for this prototype
    setLearningProgress({});
  };

  const logout = () => {
    setUserName('');
    setIsAuthenticated(false);
    setLearningProgress({});
  };

  const updateLearningProgress = (slug: string, percentage: number) => {
    setLearningProgress((prev) => ({
      ...prev,
      // Keep the user's highest score for the module
      [slug]: Math.max(prev[slug] || 0, percentage),
    }));
  };

  return (
    <UserContext.Provider value={{ userName, isAuthenticated, login, logout, learningProgress, updateLearningProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
