import React, { createContext, useState } from 'react';
import { Product } from '../../../../models/Product';

type PossibleProduct = null | Product;

interface VisualizationContextProps {
  selected: PossibleProduct,
  setSelected: (arg: PossibleProduct) => void
}

const VisualizationContext = createContext<VisualizationContextProps>({} as VisualizationContextProps);

export const VisualizationContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<PossibleProduct>(null);

  return (
    <VisualizationContext.Provider value={{ selected, setSelected }}>
      { children }
    </VisualizationContext.Provider>
  );
};

export default VisualizationContext;
