import React, { useContext } from 'react';
import { Button, Container } from './styles';

import ProductItem from './components/ProductItem';
import ProductModal from './components/ProductModal';

import DataContext from '../../../../context/data';
import VisualizationContext, { VisualizationContextProvider } from './context';
import { AnimateSharedLayout } from 'framer-motion';

const Visualization: React.FC = () => {
  const { products } = useContext(DataContext);

  return (
    <AnimateSharedLayout type="crossfade">
      <VisualizationContextProvider>
        <ProductModal />

        <Container>

          <div style={{ margin: '7px 10px' }}>
            <VisualizationContext.Consumer>
              {
                ({ setIsCreating }) => (
                  <Button onClick={() => setIsCreating(true)}>Criar produto</Button>
                )
              }
            </VisualizationContext.Consumer>
          </div>

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
