import React, { useContext } from 'react';
import { Container } from './styles';

import ProductItem from './components/ProductItem';
import ProductModal from './components/ProductModal';

import DataContext from '../../../../context/data';
import { VisualizationContextProvider } from './context';
import { AnimateSharedLayout } from 'framer-motion';

const Visualization: React.FC = () => {
  const { products } = useContext(DataContext);

  return (
    <AnimateSharedLayout type="crossfade">
      <VisualizationContextProvider>
        <Container>
          <ProductModal />

          {
            products.map((item) => (
              <ProductItem item={item} key={item.productId} />
            ))
          }
        </Container>
      </VisualizationContextProvider>
    </AnimateSharedLayout>
  );
};

export default Visualization;
