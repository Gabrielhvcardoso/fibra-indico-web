import React, { useContext } from 'react';
import { CanvasNav, NavItem, NavSelect } from './styles';
import { AnimateSharedLayout } from 'framer-motion';

import PanelContext from '../../context';

const Switcher: React.FC = () => {
  const { selected, setSelected } = useContext(PanelContext);

  return (
    <AnimateSharedLayout>
      <CanvasNav>
        {
          [
            { name: 'Recomendações' },
            { name: 'Pedidos de saque' },
            { name: 'Novos usuários' }
          ].map(({ name }, index) => (
            <NavItem
              onClick={() => setSelected(index)}
              selected={selected === index}
              key={name}
            >
              { name }
              { selected === index && <NavSelect layoutId="nav-item-selection">{ name }</NavSelect> }
            </NavItem>
          ))
        }
      </CanvasNav>
    </AnimateSharedLayout>
  );
};

export default Switcher;
