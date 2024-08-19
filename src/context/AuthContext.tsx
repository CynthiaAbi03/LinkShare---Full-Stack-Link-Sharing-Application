'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import { AuthUser, User_Public } from '@/models/User.types';
import { getUserData, isLoggedIn } from '@/lib/client/auth';
import { usePathname } from 'next/navigation';

interface AuthContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutCleanup: () => void;
  userData: AuthUser | null;
  setUserData: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  userDataLoaded: boolean;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  loadUserData: () => void;
  handleSwitchReload: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

const USERDATA_TTL = 60 * 5; // 5 minutes

export const AuthProvider: FunctionComponent<AppProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthUser | null>(null);
  const [loadUserDataState, setLoadUserDataState] = useState<boolean>(true);
  const [reload, setReload] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
  const [userDataLastLoad, setUserDataLastLoad] = useState<Date>(new Date());
  const pathname = usePathname();

  const loadUserData = () => {
    setUserDataLoaded(false);
    try {
      const userData = getUserData();
      setUserData(userData);
      setUserDataLoaded(true);
    } finally {
    }
  };

  const logoutCleanup = () => {
    setUserData(null);
    setUserDataLoaded(false);
  };

  const loadUserDataFromServer = async () => {
    if (!isLoggedIn()) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth');
      const data = await response.json();
      const { success } = data;
      if (!success) {
        let message = 'Failed to load user data from server';
        if (data.message) message = data.message;
        console.error(message);
        return;
      }
      setUserDataLastLoad(new Date());
    } catch (_) {
      console.error('Failed to load user data from server');
    } finally {
      loadUserData();
      setIsLoading(false);
    }
  };

  const handleSwitchReload = () => {
    setReload(true);
  };

  // fires on first load
  useEffect(() => {
    loadUserDataFromServer();
    console.log('i ran here ... times load data from server');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    if (reload) {
      loadUserDataFromServer();
     // console.log('i ran here ... times load data from server/ reload');
    }

    // Cleanup function to set reload to false
    return () => {
      setReload(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Fires on page load
  // useEffect(() => {
  //   const userData = getUserData();
  //   setUserData(userData);
  //   setUserDataLoaded(true);
  //   // Reload user data from server if USERDATA_TTL has expired

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        handleSwitchReload,
        logoutCleanup,
        setUserData,
        reload,
        setReload,
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
