import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type UserRole = 'investor' | 'entrepreneur' | 'worker' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  balance: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  register: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const USERS_KEY = 'll_users';
  const AUTH_EMAIL_KEY = 'll_auth_user_email';

  const getUsers = (): User[] => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  useEffect(() => {
    try {
      const email = localStorage.getItem(AUTH_EMAIL_KEY);
      if (!email) return;
      const users = getUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setUser(existing);
      }
    } catch {
      // ignore
    }
  }, []);

  const signIn = (email: string, password: string): boolean => {
    const users = getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (existing) {
      setUser(existing);
      localStorage.setItem(AUTH_EMAIL_KEY, existing.email);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(AUTH_EMAIL_KEY);
  };

  const register = (newUser: User) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = newUser;
    } else {
      users.push(newUser);
    }
    saveUsers(users);
    localStorage.setItem(AUTH_EMAIL_KEY, newUser.email);
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user,
      signIn,
      signOut,
      register
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};