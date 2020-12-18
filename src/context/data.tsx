import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks';

import { Hierarchy } from '../models/Hierarchy';
import { Product } from '../models/Product';
import { User } from '../models/User';

import AuthContext from './auth';

interface DataContextProps {
  hierarchies: Array<Hierarchy>,
  products: Array<Product>,
  setHierarchies: (arg: Array<Hierarchy>) => void,
  setProducts: (arg: Array<Product>) => void,
  users: Array<User>,
  setUsers: (arg: Array<User>) => void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataContextProvider: React.FC = ({ children }) => {
  const { secret } = useContext(AuthContext);

  const [hierarchies, setHierarchies] = useState<Array<Hierarchy>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    useFetch.get('/m/h', (response) => setHierarchies(response));
    useFetch.get('/m/p', (response) => setProducts(response));
    useFetch.get(`/m/u/${secret}`, (response) => response.code === 'success' ? setUsers(response.users) : null);
  }, [secret]);

  return (
    <DataContext.Provider value={{ hierarchies, setHierarchies, products, setProducts, users, setUsers }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
