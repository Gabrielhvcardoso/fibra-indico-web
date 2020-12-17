import React, { createContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks';

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
    useFetch.get('/m/h', (response) => setHierarchies(response));
    useFetch.get('/m/p', (response) => setProducts(response));
  }, []);

  return (
    <DataContext.Provider value={{ hierarchies, setHierarchies, products, setProducts }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
