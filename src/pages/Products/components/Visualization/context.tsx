import React, { createContext, useState } from 'react';
import { Product } from '../../../../models/Product';

type PossibleProduct = null | Product;

interface VisualizationContextProps {
  isCreating: boolean,
  selected: PossibleProduct,
  setIsCreating: (arg: boolean) => void,
  setSelected: (arg: PossibleProduct) => void
}

const VisualizationContext = createContext<VisualizationContextProps>({} as VisualizationContextProps);

export const VisualizationContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<PossibleProduct>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <VisualizationContext.Provider value={{ selected, setSelected, isCreating, setIsCreating }}>
      { children }
    </VisualizationContext.Provider>
  );
};

export default VisualizationContext;
