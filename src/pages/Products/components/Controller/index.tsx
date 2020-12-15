import React, { useContext } from 'react';
import { Container } from './styles';

import { AnimateSharedLayout } from 'framer-motion';

import DataContext from '../../../../context/data';
import { HierarchyListContextProvider } from './context';

import HierarchyItem from './components/HierarchyItem';
import HierarchyModal from './components/HierarchyModal';

const Controller: React.FC = () => {
  const { hierarchies } = useContext(DataContext);

  return (
    <Container>
      <HierarchyListContextProvider>
        <AnimateSharedLayout>
          <HierarchyModal />

          {
            hierarchies.map((item) => (
              <HierarchyItem item={item} key={item.hierarchyId} />
            ))
          }
        </AnimateSharedLayout>
      </HierarchyListContextProvider>
    </Container>
  );
};

export default Controller;
