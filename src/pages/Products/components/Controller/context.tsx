import React, { createContext, useState } from 'react';
import { Hierarchy } from '../../../../models/Hierarchy';

interface HierarchyListContextProps {
  selected: null | Hierarchy,
  setSelected: (arg: null | Hierarchy) => void,
  isCreating: boolean,
  setIsCreating: (arg: boolean) => void
}

const HierarchyListContext = createContext<HierarchyListContextProps>({} as HierarchyListContextProps);

export const HierarchyListContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<null | Hierarchy>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <HierarchyListContext.Provider value={{ selected, setSelected, isCreating, setIsCreating }}>
      { children }
    </HierarchyListContext.Provider>
  );
};

export default HierarchyListContext;
