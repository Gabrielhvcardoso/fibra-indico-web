import React, { createContext, useEffect, useState } from 'react';

import { Hierarchy } from '../models/Hierarchy';

interface DataContextProps {
  hierarchies: Array<Hierarchy>,
  setHierarchies: (arg: Array<Hierarchy>) => void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataContextProvider: React.FC = ({ children }) => {
  const [hierarchies, setHierarchies] = useState<Array<Hierarchy>>([]);

  useEffect(() => {
    setTimeout(() => {
      const tempHierarchies = [
        { hierarchyId: 1, depth: 1, porcentage: 10 },
        { hierarchyId: 2, depth: 2, porcentage: 5 }
      ];

      setHierarchies(tempHierarchies);
    }, 500);
  }, []);

  return (
    <DataContext.Provider value={{ hierarchies, setHierarchies }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
