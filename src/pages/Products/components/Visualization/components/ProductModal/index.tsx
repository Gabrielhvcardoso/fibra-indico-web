import { AnimatePresence } from 'framer-motion';
import React, { useContext } from 'react';
import Backdrop from '../../../../../../components/Backdrop';
import { Container } from './styles';

import VisualizationContext from '../../context';

const ProductModal: React.FC = () => {
  const { selected, setSelected } = useContext(VisualizationContext);

  return (
    <AnimatePresence>
      {
        selected && (
          <Backdrop onMouseDown={() => setSelected(null)}>
            <Container /* layoutId={selected.productId.toString()} */ />
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default ProductModal;
