import React, { useContext } from 'react';
import { Button, Container } from './styles';

import { AnimateSharedLayout } from 'framer-motion';

import DataContext from '../../../../context/data';
import HierarchyListContext, { HierarchyListContextProvider } from './context';

import HierarchyItem from './components/HierarchyItem';
import HierarchyModal from './components/HierarchyModal';

const Controller: React.FC = () => {
  const { hierarchies } = useContext(DataContext);

  return (
    <Container>
      <HierarchyListContextProvider>
        <AnimateSharedLayout>
          <HierarchyModal />

          <HierarchyListContext.Consumer>
            {
              ({ setIsCreating }) => <Button onClick={() => setIsCreating(true)}>Novo índice</Button>
            }
          </HierarchyListContext.Consumer>

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
