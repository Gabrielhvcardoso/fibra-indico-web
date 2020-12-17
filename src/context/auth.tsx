import React, { createContext, useEffect, useState } from 'react';

type PossibleString = null | string;

interface AuthContextProps {
  secret: PossibleString,
  authenticate: (secret: PossibleString, persistent?: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [secret, setSecret] = useState<PossibleString>(null);

  useEffect(() => {
    const local = localStorage.getItem('secret');
    const session = localStorage.getItem('secret');

    if (local || session) setSecret(local || session);
  }, []);

  const authenticate = (secret: PossibleString, persistent?: boolean): void => {
    setSecret(secret);

    if (secret) {
      if (persistent) {
        localStorage.setItem('secret', secret);
      } else {
        sessionStorage.setItem('secret', secret);
      }
    } else {
      localStorage.removeItem('secret');
      sessionStorage.removeItem('secret');
    }
  };

  return (
    <AuthContext.Provider value={{ secret, authenticate }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
