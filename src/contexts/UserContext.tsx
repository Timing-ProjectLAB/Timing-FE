// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type UserInfoType = {
  userId: string;
  username?: string;
  age?: number;
  education?: string;
  career?: string;
  incomeLevel?: number;
  regionId?: number;
};

type UserContextType = {
  userInfo: UserInfoType;
  setUserInfo: (info: Partial<UserInfoType>) => void;
  resetUserInfo: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfoType>({ userId: '' });

  const setUserInfo = (info: Partial<UserInfoType>) => {
    setUserInfoState(prev => ({ ...prev, ...info }));
  };

  const resetUserInfo = () => {
    setUserInfoState({ userId: '' });
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, resetUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};