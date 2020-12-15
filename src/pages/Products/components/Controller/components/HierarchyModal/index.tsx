import React, { useContext } from 'react';
import Backdrop from '../../../../../../components/Backdrop';
import { Container } from './styles';

import HierarchyListContext from '../../context';
import { AnimatePresence } from 'framer-motion';

const HierarchyModal: React.FC = () => {
  const { selected, setSelected } = useContext(HierarchyListContext);

  return (
    <AnimatePresence>
      {
        selected && (
          <Backdrop onMouseDown={() => setSelected(null)}>
            <Container
              layoutId={selected.hierarchyId.toString()}
              onMouseDown={e => e.stopPropagation()}
            />
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default HierarchyModal;
