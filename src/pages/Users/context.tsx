import React, { createContext, useState } from 'react';

type PossibleToken = null | string;

interface UsersContextProps {
  token: PossibleToken,
  setToken: (arg: PossibleToken) => void
}

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

export const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<PossibleToken>(null);

  return (
    <UsersContext.Provider value={{ token, setToken }}>
      { children }
    </UsersContext.Provider>
  );
};

export default UsersContext;
