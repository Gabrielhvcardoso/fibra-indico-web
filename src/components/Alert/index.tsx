import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Portal } from 'react-portal';

import { Container } from './styles';

interface Props {
  timeout?: number,
  visible?: boolean,
  onDismiss?: () => void
}

const Alert: React.FC<Props> = ({ timeout = 3000, visible, onDismiss, children }) => {
  useEffect(() => {
    if (visible && timeout && onDismiss) {
      setTimeout(() => {
        onDismiss();
      }, timeout);
    }
  }, [visible]);

  return (
    <Portal>
      <AnimatePresence>
        {
          visible && (
            <Container>
              { children ?? 'Erro' }
            </Container>
          )
        }
      </AnimatePresence>
    </Portal>
  );
};

export default Alert;
