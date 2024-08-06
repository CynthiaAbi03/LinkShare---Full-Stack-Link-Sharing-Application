import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import { User_Public } from '@/models/User.types';
import { usePathname } from 'next/navigation';

interface AuthContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutCleanup: () => Promise<void>;
  userData: User_Public | null;
  userDataLoaded: boolean;
  loadUserData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User_Public | null>(null);
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
  const [userDataLastLoad, setUserDataLastLoad] = useState<Date>(new Date());

  const loadUserData = () => {
    setUserDataLoaded(false);
    setUserData(userData);
    setUserDataLoaded(true);
  };

  const logoutCleanup = async () => {
    setUserData(null);
    setUserDataLoaded(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setIsLoading,
        logoutCleanup,
        userDataLoaded,
        loadUserData,
        isLoading,
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
