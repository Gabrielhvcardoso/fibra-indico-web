import React, { useContext } from 'react';
import { Commission, Container, Title } from './styles';

import { Product } from '../../../../../../models/Product';

import VisualizationContext from '../../context';

interface ProductProps {
  item: Product
}

const ProductItem: React.FC<ProductProps> = ({ item }) => {
  const { setSelected } = useContext(VisualizationContext);

  return (
    <Container layoutId={item.productId.toString()} onClick={() => setSelected(item)}>
      <Title>#{ item.productId }</Title>
      <Title>{ item.title }</Title>
      <Commission>R$ { item.commission.toFixed(2).replace('.', ',') }</Commission>
    </Container>
  );
};

export default ProductItem;
