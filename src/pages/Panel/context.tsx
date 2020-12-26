import React, { createContext, useState } from 'react';

interface PanelContextProps {
  selected: number,
  setSelected: (arg: number) => void
}

const PanelContext = createContext<PanelContextProps>({} as PanelContextProps);

export const PanelContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <PanelContext.Provider value={{ selected, setSelected }}>
      { children }
    </PanelContext.Provider>
  );
};

export default PanelContext;
