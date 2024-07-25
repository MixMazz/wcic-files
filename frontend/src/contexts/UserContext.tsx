import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import * as UserApi from 'src/network/user_api';
import { User } from 'src/models/user';

export interface IUser {
  loggedInUser?: User
  onLoginSuccessful: (user: User) => void;
  onLogoutSuccessful: () => void;
  updateUser: (user: User) => void;
}

export const UserContext = createContext<IUser | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used with a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInUser, setUser] = useState<User | undefined>();

  const fetchLoggedInUser = async () => {
    try {
      const user = await UserApi.getLoggedInUser();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchLoggedInUser();
  }, []);

  const onLoginSuccessful = useCallback((user: User) => {
    setUser(user);
  }, []);

  const onLogoutSuccessful = useCallback(() => {
    setUser(undefined);
  }, []);

  const updateUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  const value = useMemo(() => ({
    loggedInUser,
    onLoginSuccessful,
    onLogoutSuccessful,
    updateUser,
  }), [loggedInUser, onLoginSuccessful, onLogoutSuccessful, updateUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
