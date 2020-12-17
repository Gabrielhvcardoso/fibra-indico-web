import React from 'react';

import { AuthContextProvider } from './auth';
import { DataContextProvider } from './data';

const Contexts: React.FC = ({ children }) => (
  <AuthContextProvider>
    <DataContextProvider>
      { children }
    </DataContextProvider>
  </AuthContextProvider>
);

export default Contexts;
