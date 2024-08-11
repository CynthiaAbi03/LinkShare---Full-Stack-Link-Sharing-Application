'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import { AuthUser } from '@/models/User.types';
import { getUserData } from '@/lib/client/auth';

interface AuthContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutCleanup: () => void;
  userData: AuthUser | null;
  userDataLoaded: boolean;
  loadUserData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AppProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthUser | null>(null);
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

  const loadUserData = () => {
    setUserDataLoaded(false);

    const data = getUserData();

    if (data) {
      setUserData(data);
      setUserDataLoaded(true);
    } else {
      console.log('no user data');
    } //Gets parsed user data from browser cookies
  };

  const logoutCleanup = () => {
    setUserData(null);
    setUserDataLoaded(false);
  };

  useEffect(() => {
    loadUserData(); // Load user data on initial load
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        logoutCleanup,
        userData,
        userDataLoaded,
        loadUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
