import React, { createContext, useState } from 'react';

type PossibleString = null | string;

interface UsersContextProps {
  token: PossibleString,
  setToken: (arg: PossibleString) => void,
  indicatedBy: PossibleString,
  setIndicatedBy: (arg: PossibleString) => void,
  isDetailOpened: boolean,
  setIsDetailOpened: (arg: boolean) => void
}

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

export const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<PossibleString>(null);
  const [indicatedBy, setIndicatedBy] = useState<PossibleString>(null);
  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false);

  return (
    <UsersContext.Provider value={{ token, setToken, indicatedBy, setIndicatedBy, isDetailOpened, setIsDetailOpened }}>
      { children }
    </UsersContext.Provider>
  );
};

export default UsersContext;
