import React, { useState } from 'react';
import { Portal } from 'react-portal';
import { Container, Close, FloatingButton } from './styles';

import { X, ThreeDotsVertical } from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Backdrop from '../../../../../../components/Backdrop';

const Options: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDismiss = () => setIsOpen(false);

  return (
    <Portal>
      <AnimateSharedLayout type="crossfade">
        <FloatingButton layoutId="float-btn" onClick={() => setIsOpen(true)}>
          <ThreeDotsVertical size={25} color="white" />
        </FloatingButton>

        <AnimatePresence>
          {
            isOpen && (
              <Backdrop onMouseDown={onDismiss}>
                <Container layoutId="float-btn">
                  <Close>
                    <X size={25} onClick={onDismiss} style={{ cursor: 'pointer' }} />
                  </Close>
                </Container>
              </Backdrop>
            )
          }
        </AnimatePresence>
      </AnimateSharedLayout>
    </Portal>
  );
};

export default Options;
