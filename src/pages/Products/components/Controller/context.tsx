import React, { createContext, useState } from 'react';
import { Hierarchy } from '../../../../models/Hierarchy';

interface HierarchyListContextProps {
  selected: null | Hierarchy,
  setSelected: (arg: null | Hierarchy) => void
}

const HierarchyListContext = createContext<HierarchyListContextProps>({} as HierarchyListContextProps);

export const HierarchyListContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<null | Hierarchy>(null);

  return (
    <HierarchyListContext.Provider value={{ selected, setSelected }}>
      { children }
    </HierarchyListContext.Provider>
  );
};

export default HierarchyListContext;
