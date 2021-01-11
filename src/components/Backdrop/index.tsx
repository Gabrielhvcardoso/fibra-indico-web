import React, { SyntheticEvent } from 'react';
import { Portal } from 'react-portal';
import { Container } from './styles';

interface BackdropProps {
  onMouseDown?: (e: SyntheticEvent) => void,
  onMouseUp?: () => void,
  onMouseMove?: () => void,
  onClick?: () => void
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <Portal>
      <Container {...props} />
    </Portal>
  );
};

export default Backdrop;
