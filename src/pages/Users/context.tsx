import React, { createContext, useState } from 'react';

type PossibleToken = null | string;

interface UsersContextProps {
  token: PossibleToken,
  setToken: (arg: PossibleToken) => void,
  isDetailOpened: boolean,
  setIsDetailOpened: (arg: boolean) => void
}

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

export const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<PossibleToken>(null);
  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false);

  return (
    <UsersContext.Provider value={{ token, setToken, isDetailOpened, setIsDetailOpened }}>
      { children }
    </UsersContext.Provider>
  );
};

export default UsersContext;
