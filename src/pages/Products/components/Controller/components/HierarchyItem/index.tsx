import React, { useContext } from 'react';
import { Hierarchy } from '../../../../../../models/Hierarchy';
import { Button, Container, Text } from './styles';

import HierarchyListContext from '../../context';

interface HierarchyItemProps {
  item: Hierarchy
}

const HierarchyItem: React.FC<HierarchyItemProps> = ({ item }) => {
  const { setSelected } = useContext(HierarchyListContext);

  return (
    <Container
      layoutId={item.hierarchyId.toString()}
      onClick={() => setSelected(item)}
    >
      <Text>Profundidade: { item.depth }</Text>
      <Text>Porcentagem: { item.porcentage }%</Text>
      <Button>Editar</Button>
    </Container>
  );
};

export default HierarchyItem;
