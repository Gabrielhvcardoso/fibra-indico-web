import React from 'react';

import { DataContextProvider } from './data';

const Contexts: React.FC = ({ children }) => (
  <DataContextProvider>
    { children }
  </DataContextProvider>
);

export default Contexts;
