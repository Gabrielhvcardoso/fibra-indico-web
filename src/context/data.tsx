import React, { createContext, useEffect, useState } from 'react';

import { Hierarchy } from '../models/Hierarchy';
import { Product } from '../models/Product';

interface DataContextProps {
  hierarchies: Array<Hierarchy>,
  products: Array<Product>,
  setHierarchies: (arg: Array<Hierarchy>) => void,
  setProducts: (arg: Array<Product>) => void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataContextProvider: React.FC = ({ children }) => {
  const [hierarchies, setHierarchies] = useState<Array<Hierarchy>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    setTimeout(() => {
      const tempHierarchies = [
        { hierarchyId: 1, depth: 1, porcentage: 10 },
        { hierarchyId: 2, depth: 2, porcentage: 5 }
      ];

      const tempProducts = [
        { productId: 1, title: 'Instalação Internet Fibra', commission: 100 },
        { productId: 2, title: 'Televisão Fibra 42 pol', commission: 150 },
        { productId: 3, title: 'Pacote Anual de Internet Fibra', commission: 200 }
      ];

      setHierarchies(tempHierarchies);
      setProducts(tempProducts);
    }, 500);
  }, []);

  return (
    <DataContext.Provider value={{ hierarchies, setHierarchies, products, setProducts }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
