import React from 'react';
import Switcher from './components/Switcher';
import { Canvas, Container } from './styles';

import PanelContext, { PanelContextProvider } from './context';

import Recommendations from './Recommendations';
import Registers from './Registers';
import Withdraws from './Withdraws';

const Panel: React.FC = () => {
  return (
    <Container>
      <PanelContextProvider>
        <Switcher />
        <Canvas>
          <PanelContext.Consumer>
            {
              ({ selected }) => selected === 0
                ? <Recommendations />
                : selected === 1
                  ? <Withdraws />
                  : <Registers />
            }
          </PanelContext.Consumer>
        </Canvas>
      </PanelContextProvider>
    </Container>
  );
};

export default Panel;
