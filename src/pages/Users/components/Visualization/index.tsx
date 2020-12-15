import React, { createRef } from 'react';
import Tree from 'react-tree-graph';
import { Container } from './styles';

import { useDimensions } from '../../../../hooks';

import 'react-tree-graph/dist/style.css';
import './treeStyles.css';

const data = {
  name: 'Abraão Silva',
  textProps: { x: -25, y: 25 },
  children: [
    { name: 'Angelo Barbosa', textProps: { x: -25, y: 25 } },
    {
      name: 'Rodrigo Souza',
      textProps: { x: -25, y: 25 },
      children: [
        { name: 'Marielle Astouto' },
        { name: 'Hulia Nayeros' }
      ]
    },
    { name: 'Maria das Neves', textProps: { x: -25, y: 25 } },
    {
      name: 'Américo Santos Albuquerque',
      textProps: { x: -25, y: 25 },
      children: [
        { name: 'Angelica Barbosa', textProps: { x: -25, y: 25 } },
        { name: 'Adolfo Ruttenford', textProps: { x: -25, y: 25 } },
        {
          name: 'Cláudio Araújo',
          textProps: { x: -25, y: -25 },
          children: [
            { name: 'Ana Júlia Silva', textProps: { x: -25, y: 25 } }
          ]
        }
      ]
    }
  ]
};

const Visualization: React.FC = () => {
  const containerRef = createRef<HTMLDivElement>();

  const { height, width } = useDimensions(containerRef);

  return (
    <Container ref={containerRef} >
      <Tree
        data={data}
        nodeRadius={15}
        margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        height={height}
        width={width}
      />
    </Container>
  );
};

export default Visualization;
